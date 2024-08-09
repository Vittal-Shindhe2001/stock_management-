const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema)

module.exports = Product
