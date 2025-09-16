
// import React, { useState, useEffect } from "react";
// import SavingsGoalForm from "./SavingsGoalForm";
// import { getAllGoals, deleteGoal, addAmountToGoal } from "api/goalApi";
// import GoalProgressBar from "components/GoalProgressBar/GoalProgressBar";
// import "./SavingsGoals.scss";

// /*
//   שינוי עיקרי: שומר על אותה לוגיקה (fetch, edit, delete, add amount),
//   אך מוסיף תצוגת כרטיסיות למובייל עם כפתור הרחבה לכל כרטיס,
//   ושומר על הטבלה בדסקטופ.
// */

// function GoalCard({ goal, onEdit, onDelete, onAddAmount, calculateProgress }) {
//   const [expanded, setExpanded] = useState(false);
//   const freq = goal.autoSaving && goal.autoSaving.frequency !== "none"
//     ? goal.autoSaving.frequency
//     : "❌";

//   return (
//     <article className="goal-card" aria-labelledby={`goal-${goal._id}-title`}>
//       <header className="card-head">
//         <div className="card-title" id={`goal-${goal._id}-title`}>
//           {goal.title}
//         </div>

//         <div className="card-summary">
//           <div className="chip">
//             <span className="chip-label">יעד</span>
//             <span className="chip-value">{goal.targetAmount ?? '-'}</span>
//           </div>
//           <div className="chip">
//             <span className="chip-label">נצבר</span>
//             <span className="chip-value">{goal.currentAmount ?? 0}</span>
//           </div>
//           <div className="chip">
//             <span className="chip-label">אוטומטי</span>
//             <span className="chip-value">{freq}</span>
//           </div>
//         </div>

//         <div className="card-controls">
//           <button
//             className="btn btn-ghost"
//             onClick={() => onEdit(goal)}
//             aria-label={`ערוך ${goal.title}`}
//             title="ערוך"
//           >
//             ✏️
//           </button>

//           <button
//             className="btn"
//             onClick={() => onDelete(goal._id)}
//             aria-label={`מחק ${goal.title}`}
//             title="מחק"
//           >
//             🗑️
//           </button>

//           <button
//             className="btn btn-ghost"
//             onClick={() => onAddAmount(goal._id)}
//             aria-label={`הוסף סכום ל${goal.title}`}
//             title="הוסף סכום"
//           >
//             ➕
//           </button>

//           <button
//             className={`expand-toggle ${expanded ? "open" : ""}`}
//             onClick={() => setExpanded((s) => !s)}
//             aria-expanded={expanded}
//             aria-controls={`details-${goal._id}`}
//             title={expanded ? "סגור" : "פרטים"}
//           >
//             {expanded ? "▲" : "▼"}
//           </button>
//         </div>
//       </header>

//       <div
//         className={`card-details ${expanded ? "expanded" : ""}`}
//         id={`details-${goal._id}`}
//       >
//         <div className="progress-row">
//           <div className="progress-label">התקדמות</div>
//           <div className="progress-bar">
//             <GoalProgressBar progress={calculateProgress(goal)} />
//           </div>
//         </div>

//         <div className="details-grid">
//           <div className="detail-item">
//             <div className="detail-label">יעד (ש״ח)</div>
//             <div className="detail-value">{goal.targetAmount ?? "-"}</div>
//           </div>

//           <div className="detail-item">
//             <div className="detail-label">נצטבר (ש״ח)</div>
//             <div className="detail-value">{goal.currentAmount ?? 0}</div>
//           </div>

//           <div className="detail-item">
//             <div className="detail-label">הוספה אוטומטית</div>
//             <div className="detail-value">{freq}</div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function SavingsGoals() {
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedGoal, setSelectedGoal] = useState(null);

//   const [showAddAmount, setShowAddAmount] = useState(null); // goalId or null
//   const [extraAmount, setExtraAmount] = useState("");

//   useEffect(() => {
//     fetchGoals();
//     // eslint-disable-next-line
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const response = await getAllGoals();
//       setGoals(response.data || []);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message || "שגיאה בטעינת יעדים");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("בטוח שברצונך למחוק את היעד?")) return;

//     try {
//       await deleteGoal(id);
//       fetchGoals();
//     } catch (err) {
//       alert("שגיאה במחיקת היעד");
//     }
//   };

//   const handleEdit = (goal) => {
//     setSelectedGoal(goal);
//     setShowForm(true);
//   };

//   const handleAddNew = () => {
//     setSelectedGoal(null);
//     setShowForm(true);
//   };

//   const handleAddAmount = (goalId) => {
//     // מציג את המודאל של הכנסת סכום (הפונקציה שימשו גם בטבלה)
//     setShowAddAmount(goalId);
//   };

//   const confirmAddAmount = async (goalId) => {
//     if (!extraAmount || Number(extraAmount) <= 0) {
//       alert("יש להכניס סכום תקין");
//       return;
//     }
//     try {
//       await addAmountToGoal(goalId, Number(extraAmount));
//       setExtraAmount("");
//       setShowAddAmount(null);
//       fetchGoals();
//     } catch (err) {
//       alert("שגיאה בהוספת סכום");
//     }
//   };

//   const calculateProgress = (goal) => {
//     if (!goal || !goal.targetAmount) return 0;
//     return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
//   };

//   return (
//     <div className="app-root">
//       <div className="hero">
//         <h1>ניהול יעדי חיסכון</h1>
//         <p className="hero-sub">
//           כאן תוכל לעקוב, לערוך ולנהל את היעדים האישיים שלך בצורה מסודרת ונוחה.
//         </p>
//         <div className="hero-cta">
//           <button className="btn btn-primary" onClick={handleAddNew}>
//             ➕ הוסף יעד חדש
//           </button>
//         </div>
//       </div>

//       {loading && <p>טוען יעדים...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div className="card">
//         <div className="card-header">
//           <h3>הרשימה שלך</h3>
//         </div>

//         <div className="card-body">
//           {/* --- DESKTOP TABLE --- */}
//           <div className="desktop-view">
//             <div style={{ overflowX: "auto" }}>
//               <table className="savings-table" style={{ direction: "rtl", width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
//                 <thead>
//                   <tr style={{ background: "rgba(255,255,255,.05)" }}>
//                     <th>שם המטרה</th>
//                     <th>יעד (ש"ח)</th>
//                     <th>הוספה אוטומטית</th>
//                     <th>נצבר (ש"ח)</th>
//                     <th>התקדמות</th>
//                     <th>פעולות</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {goals.map((goal) => (
//                     <tr key={goal._id} style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
//                       <td>{goal.title}</td>
//                       <td>{goal.targetAmount}</td>
//                       <td>{goal.autoSaving && goal.autoSaving.frequency !== "none" ? goal.autoSaving.frequency : "❌"}</td>
//                       <td>{goal.currentAmount}</td>
//                       <td style={{ minWidth: 140 }}>
//                         <GoalProgressBar progress={calculateProgress(goal)} />
//                       </td>
//                       <td>
//                         <button className="btn btn-ghost" onClick={() => handleEdit(goal)} style={{ marginLeft: "6px" }}>✏️ ערוך</button>
//                         <button className="btn" onClick={() => handleDelete(goal._id)} style={{ marginLeft: "6px" }}>🗑️ מחק</button>
//                         <button className="btn btn-ghost" onClick={() => handleAddAmount(goal._id)}>➕ הוסף סכום</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* --- MOBILE CARDS --- */}
//           <div className="mobile-view">
//             <div className="cards-container">
//               {goals.map((goal) => (
//                 <GoalCard
//                   key={goal._id}
//                   goal={goal}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   onAddAmount={handleAddAmount}
//                   calculateProgress={calculateProgress}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <SavingsGoalForm
//           goal={selectedGoal}
//           onClose={() => setShowForm(false)}
//           onSave={fetchGoals}
//         />
//       )}

//       {/* modal להוספת סכום חד־פעמי */}
//       {showAddAmount && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>הוספת סכום ליעד</h3>
//             <input
//               type="number"
//               placeholder="כמה להוסיף?"
//               value={extraAmount}
//               onChange={(e) => setExtraAmount(e.target.value)}
//             />
//             <div className="form-actions">
//               <button className="btn btn-primary" onClick={() => confirmAddAmount(showAddAmount)}>
//                 💾 הוספה
//               </button>
//               <button className="btn btn-ghost" onClick={() => setShowAddAmount(null)}>
//                 ❌ ביטול
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import GoalCard from "./GoalCard";
import DesktopTable from "./DesktopTable";
import AddAmountModal from "./AddAmountModal";
import { getAllGoals, deleteGoal, addAmountToGoal } from "api/goalApi";
import "./SavingsGoals.scss";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const [showAddAmount, setShowAddAmount] = useState(null);
  const [extraAmount, setExtraAmount] = useState("");

  useEffect(() => { fetchGoals(); }, []);

  const fetchGoals = async () => {
    try {
      const response = await getAllGoals();
      setGoals(response.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || "שגיאה בטעינת יעדים");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("בטוח שברצונך למחוק את היעד?")) return;
    try { await deleteGoal(id); fetchGoals(); }
    catch { alert("שגיאה במחיקת היעד"); }
  };

  const handleEdit = (goal) => { setSelectedGoal(goal); setShowForm(true); };
  const handleAddNew = () => { setSelectedGoal(null); setShowForm(true); };
  const handleAddAmount = (goalId) => { setShowAddAmount(goalId); };
  const confirmAddAmount = async (goalId) => {
    if (!extraAmount || Number(extraAmount) <= 0) { alert("יש להכניס סכום תקין"); return; }
    try {
      await addAmountToGoal(goalId, Number(extraAmount));
      setExtraAmount(""); setShowAddAmount(null); fetchGoals();
    } catch { alert("שגיאה בהוספת סכום"); }
  };

  const calculateProgress = (goal) => {
    if (!goal || !goal.targetAmount) return 0;
    return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  };

  return (
    <div className="app-root">
      <div className="hero">
        <h1>ניהול יעדי חיסכון</h1>
        <p className="hero-sub">
          כאן תוכל לעקוב, לערוך ולנהל את היעדים האישיים שלך בצורה מסודרת ונוחה.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={handleAddNew}>➕ הוסף יעד חדש</button>
        </div>
      </div>

      {loading && <p>טוען יעדים...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card">
        <div className="card-header"><h3>הרשימה שלך</h3></div>
        <div className="card-body">
          <DesktopTable goals={goals} onEdit={handleEdit} onDelete={handleDelete} onAddAmount={handleAddAmount} calculateProgress={calculateProgress} />
          <div className="mobile-view">
            <div className="cards-container">
              {goals.map(goal => (
                <GoalCard
                  key={goal._id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddAmount={handleAddAmount}
                  calculateProgress={calculateProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showForm && <SavingsGoalForm goal={selectedGoal} onClose={() => setShowForm(false)} onSave={fetchGoals} />}
      {showAddAmount && <AddAmountModal goalId={showAddAmount} extraAmount={extraAmount} setExtraAmount={setExtraAmount} onConfirm={confirmAddAmount} onClose={() => setShowAddAmount(null)} />}
    </div>
  );
}
