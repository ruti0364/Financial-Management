import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';

const TransactionChart = () => {
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [from, setFrom] = useState(getDefaultFromDate());
  const [to, setTo] = useState(getToday());

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndPrepareData();
  }, [from, to, transactions]);

  const fetchData = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error('שגיאה בטעינת תנועות:', err);
    }
  };

 const filterAndPrepareData = () => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const filtered = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= fromDate && txDate <= toDate;
  });

  const incomeSum = filtered
    .filter(tx => tx.type === 'income')
    .reduce((acc, tx) => acc + Number(tx.sum), 0);

  const expenseSum = filtered
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => acc + Number(tx.sum), 0);

  setData([
    {
      name: 'סה"כ',
      income: incomeSum,
      expense: expenseSum,
    }
  ]);
};


  return (
    <div>
      <h3>הכנסות והוצאות לפי טווח תאריכים</h3>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <div>
          <label>מתאריך: </label>
          <input
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label>עד תאריך: </label>
          <input
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4caf50" name="הכנסות" />
            <Bar dataKey="expense" fill="#f44336" name="הוצאות" />
          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default TransactionChart;


function getToday() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // yyyy-mm-dd
}

function getDefaultFromDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 2);
  return date.toISOString().split('T')[0];
}
// This function returns a date two months ago in the format yyyy-mm-dd
// It is used to set the default "from" date in the date range filter.  