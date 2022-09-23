const express = require('express');

const {
  productControler,
} = require('../controllers');

const router = express.Router();

router.get('/', productControler.showAllProducts);

router.get('/:id', productControler.showProductById);

module.exports = router;