let productModel = require('../models/product')

let getProduct = async (req, res, next) => {
    try {
        const data = await productModel.find().lean();
        res.status(200).json({
            error: false,
            message: 'Product getting successfully',
            products: data
        })
    } catch (err) {
        next(err)
    }
}

let addProducts = async (req, res, next) => {
    try {
        let { pName, pDes, pPrice, pImage } = req.body
        await productModel.insertMany({
            pName,
            pDes,
            pPrice,
            pImage
        })
        res.status(200).json({
            error: false,
            message: 'Product added successfully',
            products: [{
                pName,
                pDes,
                pPrice,
                pImage
            }]
        })
    } catch (err) {
        next(err)
    }
}


let editProducts = async (req, res, next) => {
    try {
        let { pName, pDes, pPrice, pImage } = req.body
        let { _id } = req.query
        await productModel.updateOne({ _id }, {
            $set: {
                pName,
                pDes,
                pPrice,
                pImage
            }
        })
        res.status(200).json({
            error: false,
            message: 'Product update successfully',
            products: [{
                pName,
                pDes,
                pPrice,
                pImage
            }]
        })
    } catch (err) {
        next(err)
    }
}

let deleteProduct = async (req, res, next) => {
    let { _id } = req.query
    try {
        await productModel.deleteOne({ _id })
        res.status(200).json({
            error: false,
            message: 'Product Delete Successfully',

        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getProduct,
    addProducts,
    editProducts,
    deleteProduct
}