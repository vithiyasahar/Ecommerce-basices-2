const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')

router.route('/products')
     .get(productCtrl.getproducts)
     .post(productCtrl.createproduct)

router.route('/products/:id')
    .delete(productCtrl.deleteproduct)
    .put(productCtrl.updateproduct)





module.exports = router;