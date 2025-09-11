
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link } from "react-router-dom";
import { RegisterSchema } from "validations/authSchemas";
import { register as registerApi } from "api/authApi";
import { messages } from "constants/messages";
import Logo from '../ui/Logo';
export default function RegisterForm() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await registerApi(data);
      setMessage({ text: messages.register.success, type: "success" });
      setTimeout(() => navigate("/transactions"), 1500);
    } catch (err) {
      let msg = messages.register.serverError;
      if (err.response?.status === 409) msg = messages.register.emailExists;
      setMessage({ text: msg, type: "error" });
    }
  };

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
        <h2>הזן את הפרטים האישיים שלך כדי להתחיל</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-wrapper">

            <label>שם פרטי</label>
            <input
              type="text"
              placeholder="שם פרטי"
              {...register("firstName")}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
          </div>

          <div className="input-wrapper">
            <label>שם משפחה</label>
            <input
              type="text"
              placeholder="שם משפחה"
              {...register("lastName")}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
          </div>

          <div className="input-wrapper">
            <label>אימייל</label>
            <input
              type="text"
              placeholder="אימייל"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="input-wrapper">
            <label>סיסמה</label>
            <input
              type="password"
              placeholder="סיסמה"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "נרשם..." : "הרשמה"}
          </button>
        </form>

        {message.text && (
          <div className={`server-message ${message.type}`}>
            {message.text}
          </div>
        )}
        <Link to="/login" className="link">כבר יש לך חשבון? התחבר כאן</Link>
      </div>
    </div>
  );
}
