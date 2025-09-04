import { useState } from 'react';
import { register } from 'api/authApi';

export default function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      setMessage('נרשמת בהצלחה!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'שגיאה');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="שם פרטי" onChange={handleChange} />
      <input name="lastName" placeholder="שם משפחה" onChange={handleChange} />
      <input name="email" placeholder="אימייל" onChange={handleChange} />
      <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} />
      <button type="submit">הרשמה</button>
      {message && <p>{message}</p>}
    </form>
  );
}
