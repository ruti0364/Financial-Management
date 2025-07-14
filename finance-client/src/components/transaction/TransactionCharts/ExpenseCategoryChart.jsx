import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#d0ed57', '#a4de6c', '#f57c00'];

const ExpenseCategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const res = await getAllTransactions();
      const transactions = res.data;

      // סינון רק הוצאות
      const expenses = transactions.filter(tx => tx.type === 'expense');

      // חישוב סכום לכל קטגוריה
      const grouped = expenses.reduce((acc, tx) => {
        const category = tx.category || 'לא מוגדר';
        acc[category] = (acc[category] || 0) + Number(tx.sum);
        return acc;
      }, {});

      // המרה למערך מתאים לגרף
      const chartData = Object.keys(grouped).map((key) => ({
        name: key,
        value: grouped[key],
      }));

      setData(chartData);
    } catch (err) {
      console.error('שגיאה בטעינת גרף קטגוריות:', err);
    }
  };

  return (
    <div style={{ width: '100%', height: 350 }}>
      <h3 style={{ textAlign: 'center' }}>התפלגות הוצאות לפי קטגוריות</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseCategoryChart;
