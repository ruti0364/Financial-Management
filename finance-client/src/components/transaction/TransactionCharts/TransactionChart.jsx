import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const TransactionChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    prepareCharts();
  }, [selectedYear, transactions]);

  const fetchData = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error('שגיאה בטעינת תנועות:', err);
    }
  };

  const prepareCharts = () => {
    const filtered = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getFullYear() === parseInt(selectedYear);
    });

    // Monthly data
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: `${String(i + 1).padStart(2, '0')}/${String(selectedYear).slice(2)}`,
      income: 0,
      expense: 0
    }));

    let totalIncome = 0;
    let totalExpense = 0;

    filtered.forEach(tx => {
      const txDate = new Date(tx.date);
      const monthIndex = txDate.getMonth();
      const sum = Number(tx.sum);

      if (tx.type === 'income') {
        months[monthIndex].income += sum;
        totalIncome += sum;
      } else if (tx.type === 'expense') {
        months[monthIndex].expense += sum;
        totalExpense += sum;
      }
    });

    setMonthlyData(months);
    setYearlyData([
      {
        name: `סה"כ שנתי`,
        income: totalIncome,
        expense: totalExpense
      }
    ]);
  };
const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`דו"ח חודשי לשנת ${selectedYear}`, 14, 22);

  autoTable(doc, {
    startY: 30,
    head: [['חודש', 'הכנסות', 'הוצאות']],
    body: monthlyData.map(row => [
      row.name,
      row.income,
      row.expense
    ]),
    styles: { font: 'helvetica', fontSize: 12, halign: 'right' },
    headStyles: { fillColor: [63, 81, 181] }
  });

  doc.save(`דו"ח_חודשי_${selectedYear}.pdf`);
};
const exportToExcel = () => {
  const data = [
    ['חודש', 'הכנסות', 'הוצאות'],
    ...monthlyData.map((row) => [
      row.name,
      row.income,
      row.expense
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "סיכום חודשי");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `דו"ח_חודשי_${selectedYear}.xlsx`);
};

  return (
    <div>
      <div>
        <h3>הכנסות והוצאות לפי חודשים ({selectedYear})</h3>

        <div style={{ marginBottom: '1rem' }}>
          <label>בחר שנה: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {[2023, 2024, 2025].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* גרף חודשי */}
        <div style={{ width: '100%', height: 300, marginBottom: '3rem' }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4caf50" name="הכנסות" />
              <Bar dataKey="expense" fill="#f44336" name="הוצאות" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* גרף שנתי */}
        <h3>סיכום שנתי כולל ({selectedYear})</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={yearlyData}>
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
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={exportToExcel} style={{ marginRight: '1rem' }}>
          ייצוא ל-Excel
        </button>
        <button onClick={exportToPDF}>
          ייצוא ל-PDF
        </button>
      </div>

    </div>


  );
};

export default TransactionChart;
