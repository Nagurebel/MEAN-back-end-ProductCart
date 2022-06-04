let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    pName: {
        type: String,
        minlength: 1,
        maxlength: 30,
        required: true
    },
    pImage: {
        type: String,
        minlength: 1,
        maxlength: 10000,
        required: true
    },
    pDes: {
        type: String,
        minlength: 1,
        maxlength: 30,
        required: true
    },
    pPrice: {
        type: Number,
        minlength: 1,
        maxlength: 1000000000,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

let model = mongoose.model('productsData', productSchema)

module.exports = model;