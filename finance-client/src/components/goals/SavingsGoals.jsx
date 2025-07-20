import React, { useState, useEffect } from "react";
import SavingsGoalForm from "./SavingsGoalForm";
import { useSelector } from "react-redux";

export default function SavingsGoals() {
  const userId = useSelector((state) => state.user.userId);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/goals?userId=${userId}`);
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
    if (!window.confirm("are you shure you want to delete the goal?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/goals/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete goal");
      fetchGoals();
    } catch (err) {
      alert(" error in delete");
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
      <h2>Savings goal management</h2>

      {loading && <p>loading goals...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleAddNew}>add new goal</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {goals.map((goal) => (
          <li key={goal._id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <strong>{goal.title}</strong>
            <br />
            {goal.currentAmount} / {goal.targetAmount}
            <br />
            <button onClick={() => handleEdit(goal)} style={{ marginRight: "10px" }}>
              edit
            </button>
            <button onClick={() => handleDelete(goal._id)}>delete</button>
          </li>
        ))}
      </ul>

      {showForm && (
        <SavingsGoalForm goal={selectedGoal} onClose={() => setShowForm(false)} onSave={fetchGoals} />
      )}
    </div>
  );
}

