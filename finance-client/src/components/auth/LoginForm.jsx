
import { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "validations/authSchemas";
import { messages } from "constants/messages";
import Logo from '../ui/Logo';
export default function LoginForm() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onChange", // ולידציה בזמן הקלדה
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      setMessage({ text: messages.login.success, type: "success" });
    } catch (err) {
      let msg = messages.login.serverError;
      if (err.response?.status === 401) msg = messages.login.invalidCredentials;
      else if (err.response?.status === 404) msg = messages.login.userNotFound;
      setMessage({ text: msg, type: "error" });
    }
  };

  // נווט לדשבורד אם המשתמש מחובר
  useEffect(() => {
    if (user) navigate("/transactions");
  }, [user, navigate]);

  // הסתרת הודעה אחרי 3 שניות
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="form-wrapper">
      <div className="form-container card">
        <Link to="/" className="brand">
          <Logo />
          <span>FinTrack</span>
        </Link>
        <h2>הכנס את הפרטים שלך כדי לנהל את התקציב האישי </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-wrapper">
            <label>אימייל</label>
            <input
              type="text"
              placeholder="הקליד/י את כתובת האימייל שלך"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="input-wrapper">
            <label>סיסמה</label>
            <input
              type="password"
              placeholder="הקליד/י סיסמה"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "מתחבר..." : "התחברות"}
          </button>
        </form>

        {message.text && (
          <div className={`server-message ${message.type}`}>
            {message.text}
          </div>
        )}
        <Link to="/register" className="link">אין לך חשבון? הרשמה</Link>
      </div>
    </div>

  );
}
