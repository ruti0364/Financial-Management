// import api from './axios';

// // התחברות
// export const login = (credentials) => {
//   return api.post('/auth/login', credentials);
// };

// // הרשמה
// export const register = (userData) => {
//   return api.post('/auth/register', userData);
// };

//   // // קבלת פרטי המשתמש המחובר
//   // export const getMe = () => {
//   //   return api.get('/auth/me');
//   // };

// // התנתקות
// export const logout = () => {
//   return api.post('/auth/logout');
// };
// // //עדכון יוזר
// // export const updateUser = (userData) => {
// //   return api.put('/auth/update', userData);
// // };


// // קבלת פרטי המשתמש
// export const getMe = () => {
//   return api.get('/profile/me');
// };

// // עדכון פרטי המשתמש
// export const updateUser = (userData) => {
//   return api.put('/profile/update', userData);
// };
// authApi.js (החדש)
import api from './axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/profile/me');
export const updateUser = (userData) => api.put('/profile/update', userData);
