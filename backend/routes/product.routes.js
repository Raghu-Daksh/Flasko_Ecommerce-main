const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/product.controller.js");
const {
  addProductSchema,
  addManyProductsSchema,
  sortQuerySchema,
  filterQuerySchema,
} = require("../validations/product.validation.js");
const { validate, validateQuery } = require("../middleware/validate.js");

// ── Write Operations ──────────────────────────────────────────────────────────
router.post("/",         validate(addProductSchema),      controller.createProduct);
router.post("/add-many", validate(addManyProductsSchema), controller.createManyProducts);

// ── Filtered / Sorted reads (MUST be above /:id style routes) ────────────────
router.get("/sortedproducts", validateQuery(sortQuerySchema),   controller.getSortedProducts);
router.get("/filterData",     validateQuery(filterQuerySchema), controller.getFilteredProducts);
router.get("/search/:key",                                      controller.searchProducts);

// ── Generic reads ─────────────────────────────────────────────────────────────
router.get("/",                    controller.getAllProducts);
router.get("/product_details/:id", controller.getProductById);

// ── Destructive Operations ────────────────────────────────────────────────────
router.delete("/delete-all", controller.deleteAllProducts);

module.exports = router;