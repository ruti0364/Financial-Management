import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import IncomeForm from './income/income';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Personal Finance Tracker</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={transactions}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <IncomeForm></IncomeForm>
    </div>
  );
}

export default App;