import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#d0ed57', '#a4de6c', '#f57c00'];

const ExpenseCategoryChart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());
  const [customRange, setCustomRange] = useState(false);

  useEffect(() => {
    fetchCategoryData();
  }, [startDate, endDate]);

  const fetchCategoryData = async () => {
    try {
      const res = await getAllTransactions();
      const transactions = res.data;

      const expenses = transactions.filter(tx => {
        const date = new Date(tx.date);
        return (
          tx.type === 'expense' &&
          date >= new Date(startDate) &&
          date <= new Date(endDate)
        );
      });

      const grouped = expenses.reduce((acc, tx) => {
        const category = tx.category || 'לא מוגדר';
        acc[category] = (acc[category] || 0) + Number(tx.sum);
        return acc;
      }, {});

      const chartData = Object.keys(grouped).map(key => ({
        name: key,
        value: grouped[key],
      }));

      setData(chartData);
    } catch (err) {
      console.error('שגיאה בטעינת גרף קטגוריות:', err);
    }
  };

  // תאריכים של החודש הנוכחי
  function getFirstDayOfCurrentMonth() {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().split('T')[0];
  }

  function getLastDayOfCurrentMonth() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.toISOString().split('T')[0];
  }

  const resetToCurrentMonth = () => {
    setStartDate(getFirstDayOfCurrentMonth());
    setEndDate(getLastDayOfCurrentMonth());
    setCustomRange(false);
  };
const formatDate = (isoStr) => {
  const date = new Date(isoStr);
  return date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
  return (
    <div style={{ width: '100%', height: 420 }}>
      <h3 style={{ textAlign: 'center' }}>
        התפלגות הוצאות לפי קטגוריות
        <br />
        <span style={{ fontSize: '0.9em', color: '#555' }}>
          {formatDate(startDate)} - {formatDate(endDate)}
        </span>
      </h3>


      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        {!customRange ? (
          <button onClick={() => setCustomRange(true)}>
            בחר טווח תאריכים
          </button>
        ) : (
          <>
            <label>
              מ־
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={{ marginInline: 8 }}
              />
            </label>
            <label>
              עד
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={{ marginInline: 8 }}
              />
            </label>
            <button onClick={resetToCurrentMonth} style={{ marginInlineStart: 12 }}>
              איפוס לחודש נוכחי
            </button>
          </>
        )}
      </div>

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


