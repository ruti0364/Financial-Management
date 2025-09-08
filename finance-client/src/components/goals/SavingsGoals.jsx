
import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import { getAllGoals, deleteGoal } from "api/goalApi";
import GoalPieChart from "components/charts/GoalPieChart";

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
    if (!window.confirm("Are you sure you want to delete this goal?")) return;

    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      alert("Error deleting goal");
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
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>ניהול יעדי חיסכון</h2>

      {loading && <p>טוען יעדים...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleAddNew}>הוסף יעד חדש</button>

      <table style={{ direction: "rtl", width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>שם המטרה</th>
            <th>יעד (ש"ח)</th>
            <th>הוספה אוטומטית</th>
            <th>נצבר (ש"ח)</th>
            <th>אחוז התקדמות</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{goal.title}</td>
              <td>{goal.targetAmount}</td>
              <td>{goal.autoSaving && goal.autoSaving.frequency !== "none"
                ? goal.autoSaving.frequency
                : "❌"}</td>
              <td>{goal.currentAmount}</td>
              <td><GoalPieChart progress={calculateProgress(goal)} /></td>
              <td>
                <button onClick={() => handleEdit(goal)} style={{ marginRight: "10px" }}>ערוך</button>
                <button onClick={() => handleDelete(goal._id)}>מחק</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <SavingsGoalForm goal={selectedGoal} onClose={() => setShowForm(false)} onSave={fetchGoals} />
      )}
    </div>
  );
}



