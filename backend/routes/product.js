let express = require('express')
let auth = require('../middleware/auth')

let productRouter = express.Router();
let productController = require('../controllers/product')

// productRouter.get('/getproducts', auth.authorizeUserAndAdmin, productController.getProduct);
// productRouter.post('/add-product', auth.authorizeOnlyAndAdmin, productController.addProducts)
// productRouter.put('/edit-product', auth.authorizeOnlyAndAdmin, productController.editProducts)
// productRouter.delete('/delete-product', auth.authorizeOnlyAndAdmin, productController.deleteProduct)


productRouter.get('/getproducts', productController.getProduct)
productRouter.post('/add-product', productController.addProducts)
productRouter.put('/edit-product', productController.editProducts)
productRouter.delete('/delete-product', productController.deleteProduct)



module.exports = productRouter;