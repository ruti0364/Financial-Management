const Transaction = require('../models/transaction.model');

// @desc    Add a new transaction
// @route   POST /api/transactions
const addTransaction = async (req, res) => {
  try {
    const { type, sum, date, category } = req.body;
    console.log(req.body);
    const transaction = new Transaction({
      type,
      sum,
      date,
      category: type === 'expense' ? category : undefined,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// @desc    Update a transaction
// @route   PUT /api/transactions/:id 
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, sum, date, category  } = req.body;

  try {
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { type, sum, date, category: type === 'expense' ? category : '' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Transaction not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
 addTransaction, getTransactions ,updateTransaction, deleteTransaction
};


