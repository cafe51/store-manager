const express = require('express');

const {
  salesControler,
} = require('../controllers');

const router = express.Router();

router.get('/', salesControler.getAllSalesController);

router.post('/', salesControler.insertSalesController);

module.exports = router;