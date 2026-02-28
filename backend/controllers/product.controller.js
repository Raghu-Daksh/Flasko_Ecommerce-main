const productService = require("../services/product.service.js");

// ── POST / ────────────────────────────────────────────────────────────────────
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

// ── POST /add-many ────────────────────────────────────────────────────────────
const createManyProducts = async (req, res, next) => {
  try {
    const result = await productService.createManyProducts(req.body.products);
    res.status(201).json({ success: true, insertedCount: result.length, data: result });
  } catch (err) { next(err); }
};

// ── GET /product_details/:id ──────────────────────────────────────────────────
const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (err) { next(err); }
};

// ── GET / ─────────────────────────────────────────────────────────────────────
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    console.log("prducts", products);
    
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

// ── GET /search/:key ──────────────────────────────────────────────────────────
const searchProducts = async (req, res, next) => {
  try {
    const results = await productService.searchProducts(req.params.key);
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (err) { next(err); }
};

// ── GET /sortedproducts ───────────────────────────────────────────────────────
const getSortedProducts = async (req, res, next) => {
  try {
    const products = await productService.getSortedProducts(req.query.query);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

// ── GET /filterData ───────────────────────────────────────────────────────────
const getFilteredProducts = async (req, res, next) => {
  try {
    const products = await productService.getFilteredProducts(req.query.query);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

// ── DELETE /delete-all ────────────────────────────────────────────────────────
const deleteAllProducts = async (req, res, next) => {
  try {
    await productService.deleteAllProducts();
    res.status(200).json({ success: true, message: "All products deleted" });
  } catch (err) { next(err); }
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