// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import UpdateModal from '../updateTransaction/updateTransaction';

// const TransactionTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [editTransaction, setEditTransaction] = useState(null);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/transactions');
//       setTransactions(res.data);
//     } catch (error) {
//       console.error('Fetch error:', error.message);
//     }
//   };

//   const handleEditClick = (transaction) => {
//     setEditTransaction(transaction);
//   };

//   const handleCloseModal = () => {
//     setEditTransaction(null);
//   };

//   const handleUpdate = async (updated) => {
//     try {
//       await axios.put(`http://localhost:5000/api/transactions/${updated._id}`, {
//         sum: updated.sum,
//         date: updated.date,
//       });
//       fetchTransactions();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Update failed:', error.message);
//     }
//   };
//   const handleDelete = async (id) => {
//     const confirm = window.confirm('Are you sure you want to delete this transaction?');
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/transactions/${id}`);
//       fetchTransactions(); // Refresh the list
//     } catch (error) {
//       console.error('Delete failed:', error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Transactions</h2>
//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Date</th>
//             <th className="border p-2">Type</th>
//             <th className="border p-2">Sum</th>
//             <th className="border p-2">Category</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((tx) => (
//             <tr key={tx._id} className="text-center">
//               <td className="border p-2">{tx.date?.slice(0, 10)}</td>
//               <td className="border p-2">{tx.type}</td>
//               <td className="border p-2">{tx.sum}</td>
//               <td className="border p-2">{tx.category || '-'}</td>
//               <td className="border p-2 justify-center gap-2">
//                 <button
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleEditClick(tx)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => handleDelete(tx._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editTransaction && (
//         <UpdateModal
//           transaction={editTransaction}
//           onClose={handleCloseModal}
//           onSubmit={handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default TransactionTable;


//
// import React, { useEffect, useState } from 'react';
// import {
//   getAllTransactions,
//   createTransaction,
//   updateTransaction,
//   deleteTransaction,
//   getExpenseCategories
// } from 'api/transactionApi';
// import TransactionForm from 'components/transaction/transactionForm/transactionForm';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const exportToExcel = (transactions) => {
//   // 1. ממירים את המידע לגיליון
//   const worksheet = XLSX.utils.json_to_sheet(transactions);

//   // 2. יוצרים חוברת עבודה
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

//   // 3. ממירים לקובץ ומורידים
//   const excelBuffer = XLSX.write(workbook, {
//     bookType: 'xlsx',
//     type: 'array',
//   });

//   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//   saveAs(blob, 'transactions.xlsx');
// };

// const TransactionsPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [editTx, setEditTx] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [selectedExpense, setSelectedExpense] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [form, setForm] = useState({ type: 'income', category: '' });


//   const handleSelectChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   const handleChange = (event) => {
//     setCategories(event.target.value);
//   };

//   const filteredTransactions = transactions.filter(
//     (tx) => !selectedValue || tx.type === selectedValue
//   );
//   const filteredTransactionsExpense = transactions.filter(
//     (tx) => !selectedExpense || tx.category === selectedExpense
//   );
//   const fetchTransactions = async () => {
//     const res = await getAllTransactions();
//     setTransactions(res.data);
//   };
//   useEffect(() => {
//     if (form.type === 'expense') {
//       getExpenseCategories()
//         .then((res) => setCategories(res.data))
//         .catch((err) => console.error('Failed to load categories:', err));
//     }
//   }, [form.type]);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleCreate = async (data) => {
//     await createTransaction(data);
//     fetchTransactions();
//   };

//   const handleUpdate = async (data) => {
//     await updateTransaction(editTx._id, data);
//     setEditTx(null);
//     fetchTransactions();
//   };

//   const handleDelete = async (id) => {
//     await deleteTransaction(id);
//     fetchTransactions();
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Transactions</h1>

//       <TransactionForm
//         mode={editTx ? 'edit' : 'create'}
//         initialData={editTx}
//         onSubmit={editTx ? handleUpdate : handleCreate}
//         onCancel={() => setEditTx(null)}
//       />
//       <h2 className="text-lg mt-6 mb-2 font-semibold">סינון לפי סוג</h2>
//       <label htmlFor="sort">הצג רק:</label>
//       <select id="sort" value={selectedValue} onChange={handleSelectChange}>
//         <option value="">הכל</option>
//         <option value="income">הכנסות</option>
//         <option value="expense">הוצאות</option>
//       </select>
//       {selectedValue === 'expense' && (
//         <>
//           <label className="block mb-1">Category:</label>
//           <select name="category" value={form.category} onChange={handleChange} className="w-full border mb-3 px-2 py-1 rounded" required>
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </>
//       )}
//       <h2 className="text-lg mt-6 mb-2 font-semibold">All Transactions</h2>
//       <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden shadow-sm mt-2 bg-white">
//         <thead>
//           <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
//             <th className="py-3 px-6">Type</th>
//             <th className="py-3 px-6">Sum</th>
//             <th className="py-3 px-6">Date</th>
//             <th className="py-3 px-6">Category</th>
//             <th className="py-3 px-6 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-sm text-gray-700">
//           {filteredTransactions.map((tx) => (
//             <tr
//               key={tx._id}
//               className="border-b hover:bg-gray-50 transition duration-150"
//             >
//               <td className="py-3 px-6">
//                 <span
//                   className={`text-xs font-semibold px-2 py-1 rounded-full ${tx.type === 'income'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'
//                     }`}
//                 >
//                   {tx.type}
//                 </span>
//               </td>
//               <td className="py-3 px-6 font-medium">{tx.sum}₪</td>
//               <td className="py-3 px-6">{tx.date?.slice(0, 10)}</td>
//               <td className="py-3 px-6">{tx.category || '-'}</td>
//               <td className="py-3 px-6 text-center space-x-2">
//                 <button
//                   onClick={() => setEditTx(tx)}
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(tx._id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* <button onClick={() => exportToExcel(transactions)}> */}
//       <button
//         onClick={() => exportToExcel(filteredTransactions)}
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//       >
//         📥 ייצוא לאקסל
//       </button>
//     </div >
//   );
// };

// export default TransactionsPage;






import React, { useEffect, useState } from 'react';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getExpenseCategories
} from 'api/transactionApi';
import TransactionForm from 'components/transaction/transactionForm/transactionForm';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Modal from 'components/transaction/Modal';


const exportToExcel = (transactions) => {
  // const worksheet = XLSX.utils.json_to_sheet(transactions);
  const filteredData = transactions.map(({ _id, type, sum, date, category }) => ({
    Type: type,
    Sum: sum,
    Date: date?.slice(0, 10),
    Category: category || '-',
  }));

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'transactions.xlsx');
};

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedExpense, setSelectedExpense] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (selectedValue === 'expense') {
      getExpenseCategories()
        .then((res) => setCategories(res.data))
        .catch((err) => console.error('Failed to load categories:', err));
    } else {
      setCategories([]); // איפוס במקרה של "income" או "הכל"
    }
  }, [selectedValue]);

  const filteredTransactions = transactions.filter((tx) =>
    !selectedValue || tx.type === selectedValue
  );

  const filteredTransactionsCategories = transactions.filter((tx) =>
    !selectedValue || tx.category === selectedValue
  );

  const fetchTransactions = async () => {
    const res = await getAllTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCreate = async (data) => {
    await createTransaction(data);
    fetchTransactions();
  };

  const handleUpdate = async (data) => {
    await updateTransaction(editTx._id, data);
    setEditTx(null);
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchTransactions();
  };
  const closeModal = () => {
    setEditTx(null);
    setIsModalOpen(false);
  };

  const openEditModal = (tx) => {
    setEditTx(tx);
    setIsModalOpen(true);
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>

      <TransactionForm
        mode={editTx ? 'edit' : 'create'}
        initialData={editTx}
        onSubmit={editTx ? handleUpdate : handleCreate}
        onCancel={() => setEditTx(null)}
      />

      <h2 className="text-lg mt-6 mb-2 font-semibold">סינון לפי סוג</h2>
      <label htmlFor="sort">הצג רק:</label>
      <select id="sort" value={selectedValue} onChange={handleSelectChange}>
        <option value="">הכל</option>
        <option value="income">הכנסות</option>
        <option value="expense">הוצאות</option>
      </select>


      {selectedValue === 'expense' && (
        <>
          <label className="block mb-1 mt-3">קטגוריה:</label>
          <select
            value={selectedExpense}
            onChange={(e) => setSelectedExpense(e.target.value)}
            className="w-full border mb-3 px-2 py-1 rounded"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </>
      )}

      <h2 className="text-lg mt-6 mb-2 font-semibold">All Transactions</h2>
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
          {filteredTransactions
            .filter((tx) => !selectedExpense || tx.category === selectedExpense)
            .map((tx) => (
              <tr
                key={tx._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-6">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${tx.type === 'income'
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
                  <button
                    onClick={() => openEditModal(tx)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-600 hover:text-red-800"
                  >
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

      {/* פופאפ לעריכה */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TransactionForm
            mode="edit"
            initialData={editTx}
            onSubmit={handleUpdate}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default TransactionsPage;