const express = require('express');

const {
  salesControler,
} = require('../controllers');

const router = express.Router();

router.get('/date', salesControler.getAllSalesController);

router.get('/', salesControler.queryAllSalesWithProductsController);

router.post('/', salesControler.insertSalesController);

router.get('/:id', salesControler.getSalesByIdController);

router.delete('/:id', salesControler.deleteSalesController);

module.exports = router;