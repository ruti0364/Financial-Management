import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { UserRound } from "lucide-react";
export default function Header() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout()
  };

  return (
    <header className="header">
      <nav className='nav'>
        <Link to="/" className="brand">
          <Logo />
          <span>FinTrack</span>
        </Link>
        {user ? (
          <div className="user-actions">
            <Link to="/profile" className="nav-link">
              <UserRound size={18} />
              <span>פרופיל</span>
            </Link>
            <button className="btn btn-primary" onClick={handleLogout}>התנתקות</button>
          </div>
        ) : (
          <div className='user-actions'>
            <Link to="/login" className="btn btn-ghost">
              כניסה
            </Link>
            <Link to="/register" className="btn btn-primary">
              הרשמה
            </Link>
          </div>
        )}
      </nav>
    </header>

  );
}


function Logo() {
  return (
    <svg className="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" />
      <path d="M16 40 L26 28 L34 36 L48 20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="20" r="3" fill="#fff" />
    </svg>
  );
}