import React, { useEffect, useState } from 'react';
import { getExpenseCategories } from 'api/transactionApi';
import { useAuth } from 'context/AuthContext';
import './transactionForm.scss';

const TransactionForm = ({ mode = 'create', initialData = null,type='income', onSubmit, onCancel }) => {
  const isEdit = mode === 'edit';
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: 'income',
    sum: '',
    date: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (form.type === 'expense') {
      getExpenseCategories()
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }
  }, [form.type]);

  useEffect(() => {
    setForm(prev => ({ ...prev, type }));
  }, [type]);

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
  useEffect(() => {
    if (form.type === 'expense') {
      getExpenseCategories()
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const transactionData = {
      user: user._id,
      type: form.type,
      sum: Number(form.sum),
      date: new Date(form.date),
      category: form.type === 'expense' ? form.category : undefined,
    };

    if (onSubmit) onSubmit(transactionData);
  };
  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <div>
        <label>Sum:</label>
        <input type="number" name="sum" value={form.sum} onChange={handleChange} required />
      </div>

      <div>
        <label>Date:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </div>

      {form.type === 'expense' && (
        <div>
          <label>Category:</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-buttons">
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
};

export default TransactionForm;
