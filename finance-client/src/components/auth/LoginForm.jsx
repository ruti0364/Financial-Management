import { useState, useEffect } from 'react';
import { useAuth } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      setMessage('התחברת בהצלחה!');
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || 'שגיאה בהתחברות');
    }
  };

  // ✅ ברגע שה־user קיים → נווט לדשבורד
  useEffect(() => {
    if (user) {
      navigate('/transactions');
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="אימייל"
        onChange={handleChange}
        value={form.email}
      />
      <input
        type="password"
        name="password"
        placeholder="סיסמה"
        onChange={handleChange}
        value={form.password}
      />
      <button type="submit">התחברות</button>
      {message && <p>{message}</p>}
    </form>
  );
}
