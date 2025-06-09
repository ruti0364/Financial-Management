const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
} = require('../controllers/transactionController');

router.post('/', addTransaction);
router.get('/', getTransactions);

module.exports = router;

