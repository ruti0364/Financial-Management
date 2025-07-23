import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Label
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';

const COLORS = [
  '#00C49F', '#FF6384', '#36A2EB', '#FFCE56',
  '#7E57C2', '#4CAF50', '#FF9800', '#F06292',
];

function getCurrentMonth() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthDateRange(monthStr) {
  const [year, month] = monthStr.split('-').map(Number);
  return {
    startDate: getFirstDayOfMonth(year, month),
    endDate: getLastDayOfMonth(year, month)
  };
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1, 1).toISOString().split('T')[0];
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0).toISOString().split('T')[0];
}

function getHebrewMonthName(monthStr) {
  const [year, month] = monthStr.split('-').map(Number);
  const names = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  return `${names[month - 1]} ${year}`;
}

function generatePastMonths(count) {
  const now = new Date();
  return Array.from({ length: count }).map((_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }).reverse();
}

const CenterLabel = ({ viewBox, month }) => {
  const { cx, cy } = viewBox;
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 14 }}>
      {getHebrewMonthName(month)}
    </text>
  );
};

const ExpenseCategoryChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  useEffect(() => {
    fetchCategoryData();
  }, [selectedMonth]);

  const fetchCategoryData = async () => {
    try {
      const { startDate, endDate } = getMonthDateRange(selectedMonth);
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

  const months = generatePastMonths(12);

  return (
    <div style={{ width: '100%', height: 440 }}>
      <h3 style={{ textAlign: 'center' }}>התפלגות הוצאות לפי קטגוריות</h3>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <label>
          הצג חודש:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ marginInlineStart: 8 }}
          >
            {months.map(month => (
              <option key={month} value={month}>
                {getHebrewMonthName(month)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', fontSize: '16px', marginTop: '40px' }}>
          אין נתונים לחודש {getHebrewMonthName(selectedMonth)}
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label content={<CenterLabel month={selectedMonth} />} position="center" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginInlineStart: 24,
            flexWrap: 'wrap',
            maxHeight: 300
          }}>
            {data.map((entry, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: '50%',
                  marginInlineEnd: 8
                }} />
                <span>
                  {entry.value.toLocaleString('he-IL')} ₪ {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCategoryChart;
