import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AutoSavingOption from "../autoSavingOption/AutoSavingOption";

export default function SavingsGoalForm({ goal, onClose, onSave }) {
  const userId = useSelector((state) => state.user.userId);

  const [title, setTitle] = useState(goal ? goal.title : "");
  const [targetAmount, setTargetAmount] = useState(goal ? goal.targetAmount : "");
  const [autoSaving, setAutoSaving] = useState(goal ? goal.autoSaving : null);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setTargetAmount(goal.targetAmount);
      setAutoSaving(goal.autoSaving||null);
    } else {
      setTitle("");
      setTargetAmount("");
      setAutoSaving(null);
    }
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = goal ? "PUT" : "POST";
    const url = goal
      ? `http://localhost:5000/api/goals/${goal._id}`
      : "http://localhost:5000/api/goals";

    const bodyData = {
      title,
      targetAmount,
      userId,
      autoSaving,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error("Failed to save");

      onSave();
      onClose();
    } catch (err) {
      alert("Saving error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}
    >
      <h3>{goal ? "Edit a saving goal" : "Add a new saving goal"}</h3>

      <input
        type="text"
        placeholder="Goal name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      <input
        type="number"
        placeholder="Goal amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
        min="0"
      />
      <br />

      <AutoSavingOption
        label="Add auto saving to this goal"
        onChange={setAutoSaving}
      />

      <br />

      <button type="submit" style={{ marginRight: "10px" }}>
        Save
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}


