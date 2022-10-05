const express = require('express');

const {
  productControler,
} = require('../controllers');

const router = express.Router();

router.get('/', productControler.showAllProducts);

router.get('/:id', productControler.showProductById);

router.post('/', productControler.insertProductController);

router.put('/:id', productControler.updateProductController);

router.delete('/:id', productControler.deleteProductController);

module.exports = router;