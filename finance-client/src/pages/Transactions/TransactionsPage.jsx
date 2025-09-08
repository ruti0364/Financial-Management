// import React, { useEffect, useState } from 'react';
// import { useAuth } from 'context/AuthContext';
// import api from 'api/axios';
// import TransactionForm from 'components/transaction/transactionForm/transactionForm';
// import TransactionTable from 'components/transaction/transactionTable/transactionTable';
// import ExpenseCategoryChart from 'components/transaction/TransactionCharts/ExpenseCategoryChart';
// import TransactionChart from 'components/transaction/TransactionCharts/TransactionChart';
// import BalanceSummary from 'components/transaction/BalanceSummary/BalanceSummary';
// import './TransactionsPage.scss';
// function TransactionsPage() {
//   const { user, loading } = useAuth();
//   const [type, setType] = useState('expense');
//   const [transactions, setTransactions] = useState([]);
//   const [refreshFlag, setRefreshFlag] = useState(false);

// if (loading) return <p>טוען...</p>;
// if (!user) return <p>לא מחובר</p>;

//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/transactions');
//       setTransactions(res.data);
//     } catch (err) {
//       console.error('Error fetching transactions:', err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleTransactionAdded = () => {
//     fetchTransactions();
//   };
//  const handleCreate = async (data) => {
//     await createTransaction(data);
//     fetchTransactions();
//     setIsModalOpen(false);
//   };

//   const handleUpdate = async (data) => {
//     await updateTransaction(editTx._id, data);
//     fetchTransactions();
//     setEditTx(null);
//     setIsModalOpen(false);
//   };

//   const handleDelete = async (id) => {
//     await deleteTransaction(id);
//     fetchTransactions();
//   };
//   const triggerRefresh = () => setRefreshFlag(prev => !prev);

//   return (
//     <div className="dashboard-container">
//       <h1 className="page-title">Personal Finance Tracker</h1>
//       <div className="transaction-type">
//         <h2>בחר סוג טרנזקציה</h2>
//         <select value={type} onChange={e => setType(e.target.value)}>
//           <option value="expense">הוצאה</option>
//           <option value="income">הכנסה</option>
//         </select>
//       </div>

//       {/* <TransactionForm type={type} onTransactionAdded={() => { handleTransactionAdded(); triggerRefresh(); }} /> */}
//      <TransactionForm
//             mode={editTx ? 'edit' : 'create'}
//             initialData={editTx}
//             onSubmit={editTx ? handleUpdate : handleCreate}
//             onCancel={() => setIsModalOpen(false)}
//           />
//       <TransactionTable transactions={transactions} key={refreshFlag} />

//       <div className="charts-container">
// <div className="chart">
//   <ExpenseCategoryChart transactions={transactions} key={refreshFlag} />
// </div>
//         <div className="chart">
//           <TransactionChart transactions={transactions} key={refreshFlag} />
//         </div>
//       </div>

//       <BalanceSummary transactions={transactions} />

//       {/* <SavingsGoals /> */}
//     </div>
//   );
// }

// export default TransactionsPage;
import React, { useEffect, useState } from 'react';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from 'api/transactionApi';

import TransactionForm from 'components/transaction/transactionForm/transactionForm';
import TransactionsTable from 'components/transaction/transactionsTable/transactionsTable';
import ExpenseCategoryChart from 'components/transaction/TransactionCharts/ExpenseCategoryChart';
import TransactionChart from 'components/transaction/TransactionCharts/TransactionChart';
import './TransactionsPage.scss';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [type, setType] = useState('expense');

  // --- סינון לפי סוג (הצגה בטבלה) ---
  const filteredTransactions = transactions.filter(
    (tx) => !filterType || tx.type === filterType
  );

  // --- שליפת טרנזקציות מהשרת ---
  const fetchTransactions = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res.data || res); // תמיכה גם אם ה־API מחזיר res.data או מערך ישירות
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- שמירה (יצירה / עדכון) ---
  const handleFormSubmit = async (data) => {
    try {
      if (editTx) {
        await updateTransaction(editTx._id, data);
      } else {
        await createTransaction(data);
      }
      await fetchTransactions();
      setEditTx(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving transaction:', err);
    }
  };

  // --- מחיקה ---
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      await fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <div className="p-4 transactions-page">
      {/* כפתור לפתיחת מודל */}
      <button
        className="add-btn"
        onClick={() => {
          setEditTx(null);
          setType('income');
          setIsModalOpen(true);
        }}
      >
        + Add Transaction
      </button>

      {/* טופס יצירה / עריכה */}
      {isModalOpen && (
        <div className="modal">
          <div className="transaction-type">
            <h2>בחר סוג טרנזקציה</h2>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">הכנסה</option>
              <option value="expense">הוצאה</option>
            </select>
          </div>

          <TransactionForm
            type={type}
            mode={editTx ? 'edit' : 'create'}
            initialData={editTx}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setEditTx(null);
              setIsModalOpen(false);
            }}
          />
        </div>
      )}

      {/* טבלה */}
      <TransactionsTable
        transactions={filteredTransactions}
        onDelete={handleDelete}
        onEdit={(tx) => {
          setEditTx(tx);
          setType(tx.type);
          setIsModalOpen(true);
        }}
      />

      {/* גרפים */}
      <div className="chart">
        <TransactionChart transactions={transactions} key={transactions.length} />
      </div>
      <div className="chart">
        <ExpenseCategoryChart transactions={transactions} key={transactions.length + '-exp'} />
      </div>

    </div>
  );
};

export default TransactionsPage;







