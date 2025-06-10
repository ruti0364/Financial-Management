import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Register from './component/Register';
import Login from './component/Login';
import TransactionForm from './transactionForm/transactionForm';
import SavingsGoals from './components/savingGoals/SavingsGoals';

function App() {


  const [type, setType] = useState('expense');
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get('http://localhost:5000/api/transactions');
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionAdded = () => {
    fetchTransactions();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Personal Finance Tracker</h1>
      <Register></Register>
      <Login></Login>

        <h2>Choose Transaction Type</h2>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <TransactionForm type={type} onTransactionAdded={handleTransactionAdded} />
      <SavingsGoals></SavingsGoals>
    </div>
  );
}

export default App;