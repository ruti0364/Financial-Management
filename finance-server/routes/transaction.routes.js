const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');


router.put('/:id', updateTransaction);
router.post('/', addTransaction);
router.get('/', getTransactions);
router.delete('/:id', deleteTransaction);

module.exports = router;

