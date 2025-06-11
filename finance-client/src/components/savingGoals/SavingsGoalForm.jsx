import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SavingsGoalForm({ goal, onClose, onSave }) {
  const userId = useSelector((state) => state.user.userId);

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
    const url = goal
      ? `http://localhost:5000/api/goals/${goal._id}`
      : "http://localhost:5000/api/goals";


    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, targetAmount, userId }),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
      onClose();
    } catch (err) {
      alert("saving error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
      <h3>{goal ? "edit a saving goal" : "add a new saving goal"}</h3>
      <input
        type="text"
        placeholder="goal name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        placeholder="goal amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
        min="0"
      />
      <br />
      <button type="submit" style={{ marginRight: "10px" }}>
        save
      </button>
      <button type="button" onClick={onClose}>
        cancel
      </button>
    </form>
  );
}

