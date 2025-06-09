import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionForm({ type, onTransactionAdded }) {
  const [sum, setSum] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (type === 'expense') {
      axios.get('http://localhost:5000/api/meta/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error('Failed to load categories:', err));
    } else {
      setCategories([]);
    }
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const data = { type, sum: Number(sum), date };
    if (type === 'expense') data.category = category;

    try {
      await axios.post('http://localhost:5000/api/transactions', data);
      setMessage('Transaction added successfully!');
      setSum('');
      setDate('');
      setCategory('');
      onTransactionAdded();
    } catch (err) {
      setError('Failed to add transaction. Please check your input.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <h3>Add {type.charAt(0).toUpperCase() + type.slice(1)}</h3>

      <input
        type="number"
        value={sum}
        placeholder="Amount"
        onChange={e => setSum(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      {type === 'expense' && (
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}

      <button type="submit">Add</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TransactionForm;
