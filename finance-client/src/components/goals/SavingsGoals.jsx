
import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import { getAllGoals, deleteGoal } from "api/goalApi";
import GoalProgressBar from "components/GoalProgressBar/GoalProgressBar";

export default function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

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

  const calculateProgress = (goal) => {
    if (!goal.targetAmount) return 0;
    return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
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
          <table className="savings-table"
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
                    >
                      🗑️ מחק
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
    </div>
  );
}




