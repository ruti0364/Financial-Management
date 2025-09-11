// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api', // לשנות לכתובת השרת שלך
//   withCredentials: true,
// });

// // לא נבצע redirect אוטומטי כאן
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("401 Unauthorized – המשתמש לא מחובר");
//       // כאן אפשר רק לדחות את ה־Promise
//       // ה־AuthContext כבר ידע להגדיר user=null ולעשות Navigate אם צריך
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // כתובת השרת שלך
  withCredentials: true, // שולח קוקיז אוטומטית
});

// אפשר להוסיף interceptor אם רוצים טיפול בשגיאות גלובליות
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized – המשתמש לא מחובר");
      // ניתן לטפל כאן ב־logout או navigation אם צריך
    }
    return Promise.reject(error);
  }
);

export default api; // חייב להיות default export




