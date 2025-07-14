const mongoose = require('mongoose');
const expenseCategories = require('../constants/expenseCategories');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: expenseCategories,
    required: function () {
      return this.type === 'expense';
    },
  },
});

module.exports = module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);



