import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './transactionsTable.scss';

const exportToExcel = (transactions) => {
  const filteredData = transactions.map(({ _id, type, sum, date, category }) => ({
    Type: type,
    Sum: sum,
    Date: date ? date.slice(0, 10) : '',
    Category: category || '-',
  }));

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'transactions.xlsx');
};

const TransactionsTable = ({ transactions, onDelete, onEdit }) => {
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expenseCategories, setExpenseCategories] = useState([]);

  // עדכון רשימת הקטגוריות של ההוצאות
  useEffect(() => {
    if (typeFilter === 'expense') {
      const categories = Array.from(
        new Set(transactions.filter(tx => tx.type === 'expense').map(tx => tx.category))
      );
      setExpenseCategories(categories);
    } else {
      setExpenseCategories([]);
      setCategoryFilter('');
    }
  }, [typeFilter, transactions]);

  const filteredTransactions = transactions.filter(tx => {
    if (typeFilter && tx.type !== typeFilter) return false;
    if (typeFilter === 'expense' && categoryFilter && tx.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="transactions-table-container">
      <h2 className="title">סינון לפי סוג</h2>
      <label htmlFor="sort">הצג רק:</label>
      <select id="sort" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">הכל</option>
        <option value="income">הכנסות</option>
        <option value="expense">הוצאות</option>
      </select>

      {typeFilter === 'expense' && (
        <>
          <label htmlFor="categorySort">קטגוריה:</label>
          <select
            id="categorySort"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">כל ההוצאות</option>
            {expenseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </>
      )}

      <h2 className="title mt-4">כל הטרנזקציות</h2>
      <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden shadow-sm mt-2 bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Sum</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Category</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {filteredTransactions.map((tx) => (
            <tr key={tx._id} className="border-b hover:bg-gray-50 transition duration-150">
              <td className="py-3 px-6">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    tx.type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {tx.type}
                </span>
              </td>
              <td className="py-3 px-6 font-medium">{tx.sum}₪</td>
              <td className="py-3 px-6">{tx.date?.slice(0, 10)}</td>
              <td className="py-3 px-6">{tx.category || '-'}</td>
              <td className="py-3 px-6 text-center space-x-2">
                <button onClick={() => onEdit(tx)} className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button onClick={() => onDelete(tx._id)} className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => exportToExcel(filteredTransactions)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        📥 ייצוא לאקסל
      </button>
    </div>
  );
};

export default TransactionsTable;
