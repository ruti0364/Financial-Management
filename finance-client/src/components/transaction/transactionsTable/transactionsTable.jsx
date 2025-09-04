import React, { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from 'api/transactionApi';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './transactionsTable.scss';

const exportToExcel = (transactions) => {
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

const transactionsTable = () => {
  const { user, loading } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const fetchTransactions = async () => {
    debugger
    try {
      const res = await getAllTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed fetching transactions', err);
    }
  };

  useEffect(() => {
    if (!loading && user) fetchTransactions();
  }, [loading, user]);

  const handleCreate = async (data) => {
    await createTransaction(data);
    fetchTransactions();
    closeModal();
  };

  const handleUpdate = async (data) => {
    await updateTransaction(editTx._id, data);
    fetchTransactions();
    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
      fetchTransactions();
    }
  };

  const openEditModal = (tx) => {
    setEditTx(tx);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditTx(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditTx(null);
    setIsModalOpen(false);
  };

  const handleSelectChange = (e) => setSelectedValue(e.target.value);

  const filteredTransactions = transactions.filter(
    (tx) => !selectedValue || tx.type === selectedValue
  );

  if (!user && !loading) return <p>נא להתחבר כדי לראות את הטרנזקציות</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg mt-6 mb-2 font-semibold">סינון לפי סוג</h2>
      <label htmlFor="sort">הצג רק:</label>
      <select id="sort" value={selectedValue} onChange={handleSelectChange}>
        <option value="">הכל</option>
        <option value="income">הכנסות</option>
        <option value="expense">הוצאות</option>
      </select>

      <button
        onClick={openCreateModal}
        className="ml-4 bg-blue-600 text-white px-4 py-1 rounded"
      >
        + טרנזקציה חדשה
      </button>

      <h2 className="text-lg mt-6 mb-2 font-semibold">כל הטרנזקציות</h2>
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
                    tx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
{/* 
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TransactionForm
            mode={editTx ? 'edit' : 'create'}
            initialData={editTx}
            onSubmit={editTx ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        </Modal>
      )} */}
    </div>
  );
};

export default transactionsTable;
