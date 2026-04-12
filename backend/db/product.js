const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: String,
    title : String,
    description: String,
    price : Number,
    discountPercentage: Number,
    rating : Number,
    brand : String,
    category :String,
    thumbnail :  String,
    images: [
        String
    ]
});

// ← These make search/filter/sort queries 10-100x faster
productSchema.index({ price:    1 });
productSchema.index({ rating:  -1 });
productSchema.index({ category: 1 });
productSchema.index({ brand:    1 });

// Text index for search — replaces slow $regex scans
productSchema.index(
  { title: "text", brand: "text", category: "text" },
  { weights: { title: 3, brand: 2, category: 1 } } // title matches rank higher
);

const products = new mongoose.model('products', productSchema);
module.exports = products;