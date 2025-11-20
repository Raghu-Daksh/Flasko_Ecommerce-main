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

const products = new mongoose.model('products', productSchema);
module.exports = products;