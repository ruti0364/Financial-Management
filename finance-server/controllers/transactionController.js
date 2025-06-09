const Transaction = require('../models/Transaction');

// @desc    Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, sum, date, category } = req.body;
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
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
