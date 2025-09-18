import React, { useEffect, useState } from 'react';
import { getExpenseCategories } from 'api/transactionApi';
import { useAuth } from 'context/AuthContext';
import FinanceSelect from "components/common/FinanceSelect/FinanceSelect";
import FinanceDatePicker from "components/common/FinanceDatePicker/FinanceDatePicker";
import './transactionForm.scss';

const TransactionForm = ({ mode = 'create', initialData = null, type = 'income', onSubmit, onCancel }) => {
  const isEdit = mode === 'edit';
  const { user } = useAuth();
  const [form, setForm] = useState({
    type: 'income',
    sum: '',
    date: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const typeOptions = [
    { value: 'income', label: 'הכנסה' },
    { value: 'expense', label: 'הוצאה' },
  ];

  useEffect(() => {
    setForm(prev => ({ ...prev, type }));
  }, [type]);

  useEffect(() => {
    getExpenseCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.error(err));
  }, []);



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

      {/* סוג טרנזקציה */}
      <div className="form-group">
        <label>סוג</label>
        <FinanceSelect
          value={form.type}
          onChange={(val) => setForm(prev => ({ ...prev, type: val }))}
          options={typeOptions}
          placeholder="בחר סוג"
        />
      </div>

      {/* סכום */}
      <div className="form-group">
        <label>סכום</label>
        <input
          type="number"
          name="sum"
          value={form.sum}
          onChange={handleChange}
          required
        />
      </div>

      {/* תאריך */}
      <div className="form-group">
        <label>תאריך</label>
        <FinanceDatePicker
          value={form.date}
          onChange={(val) => setForm(prev => ({ ...prev, date: val }))}
          placeholder="בחר תאריך"
        />
      </div>

      {/* קטגוריה - רק להוצאה */}
      {form.type === 'expense' && (
        <div className="form-group">
          <label>קטגוריה</label>
          <FinanceSelect
            value={form.category}            // value בלבד
            options={categories}             // [{ value, label }, ...]
            onChange={(val) => setForm(prev => ({ ...prev, category: val }))} // שולח רק val (value)
            placeholder="בחר קטגוריה"
          />

        </div>
      )}
      {/* כפתורים */}
      <div className="form-buttons">
        {onCancel && <button type="button" className='btn btn-ghost' onClick={onCancel}>ביטול</button>}
        <button type="submit" className='btn btn-primary'>{isEdit ? 'עדכן' : 'שמור'}</button>
      </div>
    </form>
  );
};

export default TransactionForm;
