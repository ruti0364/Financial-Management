// import React, { useEffect, useState } from 'react';
// import {
//     getAllTransactions,
//     createTransaction,
//     updateTransaction,
//     deleteTransaction,
// } from 'api/transactionApi';
// import TransactionForm from 'components/transaction/transactionForm';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const TransactionTableFilter = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [editTx, setEditTx] = useState(null);
//     const [selectedValue, setSelectedValue] = useState('');

//     const fetchTransactions = async () => {
//         const res = await getAllTransactions();
//         setTransactions(res.data);
//     };

//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     const handleCreate = async (data) => {
//         await createTransaction(data);
//         fetchTransactions();
//     };

//     const handleUpdate = async (data) => {
//         await updateTransaction(editTx._id, data);
//         setEditTx(null);
//         fetchTransactions();
//     };

//     const handleDelete = async (id) => {
//         await deleteTransaction(id);
//         fetchTransactions();
//     };

//     const exportToExcel = (data) => {
//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(blob, 'transactions.xlsx');
//     };

//     const handleSelectChange = (event) => {
//         setSelectedValue(event.target.value);
//     };
//     const filteredTransactions = transactions.filter(
//         (tx) => !selectedValue || tx.type === selectedValue
//     );
//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">Transactions</h1>

//             <TransactionForm
//                 mode={editTx ? 'edit' : 'create'}
//                 initialData={editTx}
//                 onSubmit={editTx ? handleUpdate : handleCreate}
//                 onCancel={() => setEditTx(null)}
//             />

//             <h2 className="text-lg mt-6 mb-2 font-semibold">Transactions - סינון לפי סוג</h2>
//             <label htmlFor="sort">Sort By:</label>
//             <select id="sort" value={selectedValue} onChange={handleSelectChange}>
//                 <option value="">Sort By:</option>
//                 <option value="income">income</option>
//                 <option value="expense">expense</option>
//             </select>

//             <table className="w-full border mt-2">
//                 <thead>
//                     <tr>
//                         <th>Type</th>
//                         <th>Sum</th>
//                         <th>Date</th>
//                         <th>Category</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredTransactions.map((tx) => (
//                         <tr key={tx._id} className="text-center">
//                             <td>{tx.type}</td>
//                             <td>{tx.sum}</td>
//                             <td>{tx.date?.slice(0, 10)}</td>
//                             <td>{tx.category || '-'}</td>
//                             <td className="space-x-2">
//                                 <button onClick={() => setEditTx(tx)} className="text-blue-600">Edit</button>
//                                 <button onClick={() => handleDelete(tx._id)} className="text-red-600">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <button
//                 onClick={() => exportToExcel(filteredTransactions)}
//                 className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//             >
//                 📥 ייצוא לאקסל
//             </button>
//         </div>
//     );
// };

// export default TransactionTableFilter;
import React, { useEffect, useState } from 'react';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from 'api/transactionApi';
// import TransactionForm from 'components/transaction/transactionForm';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const BalanceSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchTransactions = async () => {
    const res = await getAllTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(
      (tx) => new Date(tx.date) <= new Date(selectedDate)
    );

    const income = filtered
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + Number(tx.sum), 0);

    const expense = filtered
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + Number(tx.sum), 0);

    setTotalIncome(income);
    setTotalExpense(expense);
  }, [transactions, selectedDate]);

  const handleCreate = async (data) => {
    await createTransaction(data);
    fetchTransactions();
  };

  const handleUpdate = async (data) => {
    await updateTransaction(editTx._id, data);
    setEditTx(null);
    fetchTransactions();
  };



  const balance = totalIncome - totalExpense;
  const isPositive = balance >= 0;

  return (
    <div className="p-4">
      <div className="my-4">
        <label htmlFor="date" className="mr-2">חישוב יתרה לפי תאריך:</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-1"
        />
      </div>
      <div
        className="mt-6 p-4 rounded font-bold text-center"
        style={{
          width:'10rem',
          backgroundColor: isPositive ? '#e6ffed' : '#ffe6e6',
          color: isPositive ? '#006400' : '#b30000',
          border: `2px solid ${isPositive ? '#006400' : '#b30000'}`,
        }}
      >
        {isPositive ? 'יתרה חיובית: ' : 'יתרה שלילית: '}
        {balance.toLocaleString('he-IL')} ₪
      </div>
    </div>
  );
};

export default BalanceSummary;