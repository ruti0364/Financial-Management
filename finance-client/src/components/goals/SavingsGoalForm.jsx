import React, { useState, useEffect } from "react";

export default function SavingsGoalForm({ goal, onClose, onSave }) {
  const [title, setTitle] = useState(goal ? goal.title : "");
  const [targetAmount, setTargetAmount] = useState(goal ? goal.targetAmount : "");

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setTargetAmount(goal.targetAmount);
    } else {
      setTitle("");
      setTargetAmount("");
    }
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = goal ? "PUT" : "POST";
    const url = goal ? `/api/goals/${goal._id}` : "/api/goals";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, targetAmount }),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
      onClose();
    } catch (err) {
      alert("שגיאה בשמירה");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
      <h3>{goal ? "ערוך יעד חיסכון" : "הוסף יעד חיסכון חדש"}</h3>
      <input
        type="text"
        placeholder="שם היעד"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        placeholder="סכום יעד"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
        min="0"
      />
      <br />
      <button type="submit" style={{ marginRight: "10px" }}>
        שמור
      </button>
      <button type="button" onClick={onClose}>
        ביטול
      </button>
    </form>
  );
}

