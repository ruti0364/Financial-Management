
import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import { getAllGoals, deleteGoal, addAmountToGoal } from "api/goalApi";
import GoalProgressBar from "components/GoalProgressBar/GoalProgressBar";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // 👇 state חדש עבור modal הוספת סכום
  const [showAddAmount, setShowAddAmount] = useState(null); // goalId או null
  const [extraAmount, setExtraAmount] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await getAllGoals();
      setGoals(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("בטוח שברצונך למחוק את היעד?")) return;

    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      alert("שגיאה במחיקת היעד");
    }
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedGoal(null);
    setShowForm(true);
  };

  // 👇 פונקציה חדשה להוספת סכום חד־פעמי
  const handleAddAmount = async (goalId) => {
    if (!extraAmount || extraAmount <= 0) {
      alert("הכנסי סכום תקין");
      return;
    }
    try {
      await addAmountToGoal(goalId, Number(extraAmount));
      setExtraAmount("");
      setShowAddAmount(null);
      fetchGoals();
    } catch (err) {
      alert("שגיאה בהוספת סכום");
    }
  };

  const calculateProgress = (goal) => {
    if (!goal.targetAmount) return 0;
    return Math.min(
      100,
      Math.round((goal.currentAmount / goal.targetAmount) * 100)
    );
  };

  return (
    <div className="app-root">
      <div className="hero">
        <h1>ניהול יעדי חיסכון</h1>
        <p className="hero-sub">
          כאן תוכלי לעקוב, לערוך ולנהל את היעדים האישיים שלך בצורה מסודרת ונוחה.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ הוסף יעד חדש
          </button>
        </div>
      </div>

      {loading && <p>טוען יעדים...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card">
        <div className="card-header">
          <h3>הרשימה שלך</h3>
        </div>
        <div className="card-body" style={{ overflowX: "auto" }}>
          <table
            className="savings-table"
            style={{
              direction: "rtl",
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255,255,255,.05)" }}>
                <th>שם המטרה</th>
                <th>יעד (ש"ח)</th>
                <th>הוספה אוטומטית</th>
                <th>נצבר (ש"ח)</th>
                <th>התקדמות</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr
                  key={goal._id}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <td>{goal.title}</td>
                  <td>{goal.targetAmount}</td>
                  <td>
                    {goal.autoSaving && goal.autoSaving.frequency !== "none"
                      ? goal.autoSaving.frequency
                      : "❌"}
                  </td>
                  <td>{goal.currentAmount}</td>
                  <td>
                    <GoalProgressBar progress={calculateProgress(goal)} />
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      onClick={() => handleEdit(goal)}
                      style={{ marginLeft: "6px" }}
                    >
                      ✏️ ערוך
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(goal._id)}
                      style={{ marginLeft: "6px" }}
                    >
                      🗑️ מחק
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowAddAmount(goal._id)}
                    >
                      ➕ הוסף סכום
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <SavingsGoalForm
          goal={selectedGoal}
          onClose={() => setShowForm(false)}
          onSave={fetchGoals}
        />
      )}

      {/* 👇 modal להוספת סכום חד־פעמי */}
      {showAddAmount && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>הוספת סכום ליעד</h3>
            <input
              type="number"
              placeholder="כמה להוסיף?"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
            />
            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleAddAmount(showAddAmount)}
              >
                💾 הוספה
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowAddAmount(null)}
              >
                ❌ ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import goalApi from "../../api/goalApi";
// import Modal from "./modal"; // 👈 שימוש בקומפוננטת modal אחידה
// import SavingsGoalForm from "./SavingsGoalForm";

// export default function SavingsGoals() {
//   const userId = useSelector((state) => state.user.userId);
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingGoal, setEditingGoal] = useState(null);
//   const [showAddAmount, setShowAddAmount] = useState(null);
//   const [extraAmount, setExtraAmount] = useState("");

//   useEffect(() => {
//     if (!userId) return;

//     setLoading(true);
//     goalsApi
//       .getGoals(userId)
//       .then((res) => {
//         setGoals(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("שגיאה בטעינת היעדים");
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleSaveGoal = async (goalData) => {
//     try {
//       if (editingGoal) {
//         const res = await goalsApi.updateGoal(editingGoal._id, goalData);
//         setGoals(goals.map((g) => (g._id === editingGoal._id ? res.data : g)));
//       } else {
//         const res = await goalsApi.createGoal({ ...goalData, userId });
//         setGoals([...goals, res.data]);
//       }
//       setShowForm(false);
//       setEditingGoal(null);
//     } catch (err) {
//       console.error("שגיאה בשמירת יעד:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("בטוח שברצונך למחוק את היעד?")) return;
//     try {
//       await goalsApi.deleteGoal(id);
//       setGoals(goals.filter((g) => g._id !== id));
//     } catch (err) {
//       console.error("שגיאה במחיקה:", err);
//     }
//   };

//   const handleAddAmount = async (id) => {
//     try {
//       const goal = goals.find((g) => g._id === id);
//       if (!goal) return;

//       const updatedGoal = {
//         ...goal,
//         currentAmount: goal.currentAmount + Number(extraAmount),
//       };

//       const res = await goalsApi.updateGoal(id, updatedGoal);
//       setGoals(goals.map((g) => (g._id === id ? res.data : g)));
//       setShowAddAmount(null);
//       setExtraAmount("");
//     } catch (err) {
//       console.error("שגיאה בעדכון סכום:", err);
//     }
//   };

//   if (loading) return <p>טוען נתונים...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="goals-container">
//       <h2>היעדים שלי</h2>
//       <button className="btn btn-primary" onClick={() => setShowForm(true)}>
//         ➕ יעד חדש
//       </button>

//       <div className="goals-list">
//         {goals.length === 0 && <p>אין לך עדיין יעדים.</p>}
//         {goals.map((goal) => (
//           <div key={goal._id} className="goal-card">
//             <h3>{goal.name}</h3>
//             <p>
//               {goal.currentAmount} / {goal.targetAmount} ₪
//             </p>
//             <div className="goal-actions">
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => {
//                   setEditingGoal(goal);
//                   setShowForm(true);
//                 }}
//               >
//                 ✏️ עריכה
//               </button>
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => handleDelete(goal._id)}
//               >
//                 🗑️ מחיקה
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowAddAmount(goal._id)}
//               >
//                 ➕ הוסף סכום
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* טופס יצירת/עריכת יעד */}
//       {showForm && (
//         <Modal
//           title={editingGoal ? "עריכת יעד" : "הוספת יעד חדש"}
//           onClose={() => {
//             setShowForm(false);
//             setEditingGoal(null);
//           }}
//         >
//           <SavingsGoalForm
//             initialData={editingGoal}
//             onSave={handleSaveGoal}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingGoal(null);
//             }}
//           />
//         </Modal>
//       )}

//       {/* טופס הוספת סכום */}
//       {showAddAmount && (
//         <Modal title="הוספת סכום ליעד" onClose={() => setShowAddAmount(null)}>
//           <input
//             type="number"
//             placeholder="כמה להוסיף?"
//             value={extraAmount}
//             onChange={(e) => setExtraAmount(e.target.value)}
//           />
//           <div className="form-actions">
//             <button
//               className="btn btn-primary"
//               onClick={() => handleAddAmount(showAddAmount)}
//             >
//               💾 הוספה
//             </button>
//             <button
//               className="btn btn-ghost"
//               onClick={() => setShowAddAmount(null)}
//             >
//               ❌ ביטול
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }




