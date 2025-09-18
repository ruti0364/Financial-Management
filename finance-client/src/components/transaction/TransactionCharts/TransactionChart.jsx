import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getAllTransactions } from 'api/transactionApi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';
import FinanceSelect from "components/common/FinanceSelect/FinanceSelect";
import './Charts.scss';

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
      <div className='year-select'>
        <label>בחר שנה: </label>
        <FinanceSelect
          value={selectedYear}
          onChange={(val) => setSelectedYear(val)}
          options={[
            { value: 2023, label: "2023" },
            { value: 2024, label: "2024" },
            { value: 2025, label: "2025" }
          ]}
          placeholder="בחר שנה"
        />
      </div>

      <div className='charts-container'>
        <div className='chart'>
          <h3>הכנסות והוצאות לפי חודשים ({selectedYear})</h3>
          {/* גרף חודשי */}
          <div style={{ width: '100%', height: 300, marginBottom: '3rem' }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="var(--brand)" name="הכנסות" radius={[6, 6, 0, 0]}/>
                <Bar dataKey="expense" fill="#ff4d4d" name="הוצאות" radius={[6, 6, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='export-container'>
            <button onClick={exportToExcel} className='btn btn-primary export-btn'>
                 <Download size={16} />
              Excel ייצוא ל 
            </button>
            <button onClick={exportToPDF} className='btn btn-primary export-btn'>
               <Download size={16} />
              PDF ייצוא ל 
            </button>
          </div>
        </div>
        <div className='chart'>
          {/* גרף שנתי */}
          <h3>סיכום שנתי כולל ({selectedYear})</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={yearlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="var(--brand)" name="הכנסות" radius={[6, 6, 0, 0]}/>
                <Bar dataKey="expense" fill="#ff4d4d" name="הוצאות"radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


    </div>


  );
};

export default TransactionChart;
