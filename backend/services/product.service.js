const Product   = require("../db/product");
const { NotFoundError } = require("../middleware/customErrorHandler");

// ── Shared lean projection (never send __v) ──────────────────────────────────
const BASE_PROJECTION = { __v: 0 };

// ── Create one product ────────────────────────────────────────────────────────
const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product.toObject();
};

// ── Insert many products ──────────────────────────────────────────────────────
const createManyProducts = async (productsArray) => {
  // ordered:false → continues inserting even if one fails
  return Product.insertMany(productsArray, { ordered: false });
};

// ── Get product by ID ─────────────────────────────────────────────────────────
const getProductById = async (id) => {
  const product = await Product.findById(id)
    .select(BASE_PROJECTION)
    .lean(); // lean() → plain JS object, up to 5x faster

  if (!product) throw new NotFoundError("Product not found", 404);
  return product;
};

// ── Get all products ──────────────────────────────────────────────────────────
const getAllProducts = async () => {
  const data = await Product.find().select(BASE_PROJECTION).lean();
  if (!data.length) throw new NotFoundError("No products found", 404);
  return data;
};

// ── Search products (case-insensitive, indexed regex) ─────────────────────────
const searchProducts = async (key) => {
  // 'i' flag = case-insensitive. Add text index on schema for production scale.
  const regex   = new RegExp(key, "i");
  const results = await Product.find({
    $or: [
      { brand:    regex },
      { category: regex },
      { title:    regex },
    ],
  })
    .select(BASE_PROJECTION)
    .lean();

  if (!results.length) throw new NotFoundError("No products found for that search", 404);
  return results;
};

// ── Sort products ─────────────────────────────────────────────────────────────
const SORT_MAP = {
  "price high to low": { price: -1 },
  "price low to high": { price:  1 },
  "top ratings":       { rating: -1 },
};

const getSortedProducts = async (query) => {
  const sortOption = SORT_MAP[query] || {};
  return Product.find().sort(sortOption).select(BASE_PROJECTION).lean();
};

// ── Filter products (by price range OR category/brand) ───────────────────────
const getFilteredProducts = async (query) => {
  // "All" → return everything
  if (query === "All") {
    return Product.find().select(BASE_PROJECTION).lean();
  }

  // Numeric string → treat as max price
  const numericQuery = Number(query);
  if (!isNaN(numericQuery) && numericQuery > 0) {
    return Product.find({ price: { $gte: 0, $lte: numericQuery } })
      .sort({ price: -1 })
      .select(BASE_PROJECTION)
      .lean();
  }

  // Otherwise → category/brand text filter
  const regex   = new RegExp(query, "i");
  const results = await Product.find({
    $or: [{ category: regex }, { brand: regex }],
  })
    .select(BASE_PROJECTION)
    .lean();

  if (!results.length) throw new NotFoundError("No products found for that filter", 404);
  return results;
};

// ── Delete all products ───────────────────────────────────────────────────────
const deleteAllProducts = async () => {
  return Product.deleteMany({});
};

module.exports = {
  createProduct,
  createManyProducts,
  getProductById,
  getAllProducts,
  searchProducts,
  getSortedProducts,
  getFilteredProducts,
  deleteAllProducts,
};