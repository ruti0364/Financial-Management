import api from './axios';

// התחברות
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

// הרשמה
export const register = (userData) => {
  return api.post('/auth/register', userData);
};

// קבלת פרטי המשתמש המחובר
export const getMe = () => {
  return api.get('/auth/me');
};

// התנתקות
export const logout = () => {
  return api.post('/auth/logout');
};
