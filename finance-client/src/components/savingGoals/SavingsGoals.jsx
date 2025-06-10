import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";

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
      const response = await fetch("/api/goals");
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      setGoals(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("בטוח שברצונך למחוק את היעד?")) return;

    try {
      const response = await fetch(`/api/goals/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete goal");
      fetchGoals();
    } catch (err) {
      alert("שגיאה במחיקה");
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

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>ניהול יעדי חיסכון</h2>

      {loading && <p>טוען יעדים...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleAddNew}>הוסף יעד חדש</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {goals.map((goal) => (
          <li key={goal._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <strong>{goal.title}</strong>
            <br />
            {goal.currentAmount} / {goal.targetAmount}
            <br />
            <button onClick={() => handleEdit(goal)} style={{ marginRight: "10px" }}>
              ערוך
            </button>
            <button onClick={() => handleDelete(goal._id)}>מחק</button>
          </li>
        ))}
      </ul>

      {showForm && (
        <SavingsGoalForm goal={selectedGoal} onClose={() => setShowForm(false)} onSave={fetchGoals} />
      )}
    </div>
  );
}

