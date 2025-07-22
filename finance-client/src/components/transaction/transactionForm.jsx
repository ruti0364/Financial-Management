import React, { useEffect, useState } from 'react';
import { getExpenseCategories } from 'api/transactionApi';

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

      <div className="flex gap-4 mb-3">
        <label>
          <input type="radio" name="type" value="income" checked={form.type === 'income'} onChange={handleChange} />
          הכנסה
        </label>
        <label>
          <input type="radio" name="type" value="expense" checked={form.type === 'expense'} onChange={handleChange} />
          הוצאה
        </label>
      </div>

      <label className="block mb-1">Sum:</label>
      <input
        type="number"
        name="sum"
        value={form.sum}
        onChange={handleChange}
        className="w-full border mb-3 px-2 py-1 rounded"
        required
      />

      <label className="block mb-1">Date:</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border mb-3 px-2 py-1 rounded"
        required
      />

      {form.type === 'expense' && (
        <>
          <label className="block mb-1">Category:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border mb-3 px-2 py-1 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="flex justify-end gap-2 mt-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-1 border rounded">
            Cancel
          </button>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
