// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TransactionForm = ({ mode = 'create', initialData = null, onSubmit, onCancel }) => {
//   const isEdit = mode === 'edit';
//     const [form, setForm] = useState({
//     sum: '',
//     date: '',
//     type: 'income',
//     category: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (type === 'expense') {
//       axios.get('http://localhost:5000/api/meta/categories')
//         .then(res => setCategories(res.data))
//         .catch(err => console.error('Failed to load categories:', err));
//     // } else {
//     //   setCategories([]);
//     }
//   }, [form.type]);
//   useEffect(() => {
//     if (isEdit && initialData) {
//       setForm({
//         sum: initialData.sum,
//         date: initialData.date?.slice(0, 10),
//         type: initialData.type,
//         category: initialData.category || '',
//       });
//     }
//   }, [isEdit, initialData]);

//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     const data = { type, sum: Number(sum), date };
//     if (type === 'expense') data.category = category;

//     try {
//       await axios.post('http://localhost:5000/api/transactions', data);
//       setMessage('Transaction added successfully!');
//       setSum('');
//       setDate('');
//       setCategory('');
//       onTransactionAdded();
//     } catch (err) {
//       setError('Failed to add transaction. Please check your input.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
//       <h3>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h3>

//       <input
//         type="number"
//         value={sum}
//         placeholder="Amount"
//         onChange={e => setSum(e.target.value)}
//         required
//       />

//       <input
//         type="date"
//         value={date}
//         onChange={e => setDate(e.target.value)}
//         required
//       />

//       {type === 'expense' && (
//         <select value={category} onChange={e => setCategory(e.target.value)} required>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>
//       )}

//       <button type="submit">Add</button>

//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// }

// export default TransactionForm;
import React, { useEffect, useState } from 'react';
import { getExpenseCategories } from 'api/transactionApi';
import './transactionForm.css';


const TransactionForm = ({ mode = 'create', initialData = null, onSubmit, onCancel }) => {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({ sum: '', date: '', type: 'income', category: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (form.type === 'expense') {
      getExpenseCategories()
        .then((res) => setCategories(res.data))
        .catch((err) => console.error('Failed to load categories:', err));
    }
  }, [form.type]);

  useEffect(() => {
    if (isEdit && initialData) {
      setForm({
        sum: initialData.sum,
        date: initialData.date?.slice(0, 10),
        type: initialData.type,
        category: initialData.category || '',
      });
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <div className="type-tabs">
        <label className={`tab ${form.type === 'income' ? 'active' : ''}`}>
          <input
            type="radio"
            name="type"
            value="income"
            checked={form.type === 'income'}
            onChange={handleChange}
          />
          הכנסה
        </label>

        <label className={`tab ${form.type === 'expense' ? 'active' : ''}`}>
          <input
            type="radio"
            name="type"
            value="expense"
            checked={form.type === 'expense'}
            onChange={handleChange}
          />
          הוצאה
        </label>
      </div>
      <label className="block mb-1">Sum:</label>
      <input type="number" name="sum" value={form.sum} onChange={handleChange} className="w-full border mb-3 px-2 py-1 rounded" required />

      <label className="block mb-1">Date:</label>
      <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border mb-3 px-2 py-1 rounded" required />

      {/* <label className="block mb-1">Type:</label> */}
      {/* <select name="type" value={form.type} onChange={handleChange} className="w-full border mb-3 px-2 py-1 rounded">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select> */}

      {form.type === 'expense' && (
        <>
          <label className="block mb-1">Category:</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border mb-3 px-2 py-1 rounded" required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </>
      )}

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-1 border rounded">Cancel</button>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">{isEdit ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
};

export default TransactionForm;