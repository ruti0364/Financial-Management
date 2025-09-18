import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { UserRound, Menu, X } from "lucide-react";
import Logo from './Logo';
import './Header.scss';

export default function Header() {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="brand">
            <Logo />
            <span>FinTrack</span>
          </Link>
        </div>

        {/* כפתור המבורגר יופיע רק במסכים קטנים (ע"י SCSS) */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* תפריט ניווט */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {user && (
            <>
              <Link to="/transactions" className="nav-link">
                הכנסות והוצאות
              </Link>
              <Link to="/goals" className="nav-link">
                יעדים
              </Link>
            </>
          )}

          <div className="nav-right">
            {user ? (
              <>
                <Link to="/profile" className="nav-link">
                  <UserRound size={18} />
                  <span>{user.firstName}</span>
                </Link>
                <button className="btn btn-primary" onClick={handleLogout}>
                  התנתקות
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  כניסה
                </Link>
                <Link to="/register" className="btn btn-primary">
                  הרשמה
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}


