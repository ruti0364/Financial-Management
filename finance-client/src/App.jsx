import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Register from './component/Register';
import Login from './component/Login';
import Profile from './component/Profile';
import TransactionForm from './components/transaction/transactionForm';
import TransactionTable from './components/transaction/transactionTable/transactionTable';
import SavingsGoals from './components/goals/SavingsGoals';
import ExpenseCategoryChart from './components/transaction/TransactionCharts/ExpenseCategoryChart';
import TransactionChart from './components/transaction/TransactionCharts/TransactionChart';
import TransactionTableFilter from './components/transaction/BalanceSummary/BalanceSummary';
function App() {


  const [type, setType] = useState('expense');
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = React.useState(false);

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
  const handleAdded = () => setRefresh(prev => !prev);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Personal Finance Tracker</h1>
      <Register></Register>
      <Login></Login>
      <Profile></Profile>
      {/* <h2>Choose Transaction Type</h2>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <TransactionForm type={type} onTransactionAdded={handleTransactionAdded} /> */}


      <div>
        {/* <button onClick={() => setType('income')}>Income</button>
      <button onClick={() => setType('expense')}>Expense</button> */}

        {/* <TransactionForm type={type} onTransactionAdded={handleAdded} /> */}
        <TransactionTable key={refresh} />
        <ExpenseCategoryChart />
        <TransactionChart />
        <TransactionTableFilter/>
      </div>
      <SavingsGoals></SavingsGoals>
    </div>
  );
}

export default App;