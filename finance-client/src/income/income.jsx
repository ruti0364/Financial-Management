import React, { useState } from 'react';
import axios from 'axios';

const IncomeForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/income', {
        date,
        amount: parseFloat(amount),
      });
      setMessage(res.data.message);
      setDate('');
      setAmount('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Add Income</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default IncomeForm;