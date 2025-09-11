
// import { useEffect, useState } from 'react';
// import { useAuth } from 'context/AuthContext';
// import { getMe, updateUser } from 'api/authApi';

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//   });
//   const [loading, setLoading] = useState(true);

//   // הבאת נתוני המשתמש המחובר
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getMe();
//         setUser(res.data); // עדכון ב־AuthContext
//         setFormData({
//           firstName: res.data.firstName || '',
//           lastName: res.data.lastName || '',
//           email: res.data.email || '',
//         });
//       } catch (err) {
//         console.error("שגיאה בשליפת המשתמש:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [setUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await updateUser(formData);
//       setUser(res.data); // עדכון בקונטקסט
//       alert('פרטי המשתמש עודכנו בהצלחה');
//     } catch (err) {
//       console.error("שגיאה בעדכון המשתמש:", err);
//       alert('שגיאה בעדכון פרטי המשתמש');
//     }
//   };

//   if (loading) return <p>טוען...</p>;

//   return (
//     <div>
//       <h2>שלום {formData.firstName} {formData.lastName}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>שם פרטי:</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>שם משפחה:</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>דוא"ל:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">עדכון פרטים</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
//גרסה 2
// import { useEffect, useState } from 'react';
// import { useAuth } from 'context/AuthContext';
// import { getMe, updateUser } from 'api/authApi';

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getMe();
//         setUser(res.data);
//         setFormData(prev => ({
//           ...prev,
//           firstName: res.data.firstName || '',
//           lastName: res.data.lastName || '',
//           email: res.data.email || '',
//         }));
//       } catch (err) {
//         console.error("שגיאה בשליפת המשתמש:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [setUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // בדיקה אם הסיסמאות החדשות תואמות
//     if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
//       alert("הסיסמאות החדשות לא תואמות!");
//       return;
//     }

//     // הכנת הנתונים לשליחה
//     const updateData = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//     };

//     if (formData.oldPassword && formData.newPassword) {
//       updateData.oldPassword = formData.oldPassword;
//       updateData.password = formData.newPassword;
//     }

//     try {
//       const res = await updateUser(updateData);
//       setUser(res.data);
//       alert("פרטי המשתמש עודכנו בהצלחה!");
//       // ניקוי שדות סיסמה
//       setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
//     } catch (err) {
//       console.error("שגיאה בעדכון המשתמש:", err);
//       alert("שגיאה בעדכון פרטי המשתמש");
//     }
//   };

//   if (loading) return <p>טוען...</p>;

//   return (
//     <div>
//       <h2>שלום {formData.firstName} {formData.lastName}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>שם פרטי:</label>
//           <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
//         </div>
//         <div>
//           <label>שם משפחה:</label>
//           <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
//         </div>
//         <div>
//           <label>דוא"ל:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>

//         <h3>שינוי סיסמה</h3>
//         <div>
//           <label>סיסמה ישנה:</label>
//           <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
//         </div>
//         <div>
//           <label>סיסמה חדשה:</label>
//           <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
//         </div>
//         <div>
//           <label>אשר סיסמה חדשה:</label>
//           <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
//         </div>

//         <button type="submit">עדכון פרטים</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { updateUser } from 'api/authApi';

const Profile = () => {
  const { user, setUser } = useAuth(); // השתמש ב-setUser במקום refreshUser
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      }));
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("הסיסמאות החדשות לא תואמות!");
      return;
    }

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    if (formData.oldPassword && formData.newPassword) {
      updateData.oldPassword = formData.oldPassword;
      updateData.password = formData.newPassword; // או newPassword לפי backend
    }

    try {
      const res = await updateUser(updateData);
      setUser(res.data); // ✅ עדכון המשתמש ב־context
      alert("פרטי המשתמש עודכנו בהצלחה!");
      setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      console.error("שגיאה בעדכון המשתמש:", err);
      alert(err.response?.data?.message || "שגיאה בעדכון פרטי המשתמש");
    }
  };

  if (loading) return <p>טוען...</p>;

  return (
    <div>
      <h2>שלום {formData.firstName} {formData.lastName}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם פרטי:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>שם משפחה:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>דוא"ל:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <h3>שינוי סיסמה</h3>
        <div>
          <label>סיסמה ישנה:</label>
          <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
        </div>
        <div>
          <label>סיסמה חדשה:</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
        </div>
        <div>
          <label>אשר סיסמה חדשה:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <button type="submit">עדכון פרטים</button>
      </form>
    </div>
  );
};

export default Profile;
