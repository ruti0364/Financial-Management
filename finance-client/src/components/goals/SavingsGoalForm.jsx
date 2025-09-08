
import React, { useState, useEffect } from "react";
import AutoSavingOption from "../autoSavingOption/AutoSavingOption";
import { createGoal, updateGoal } from "api/goalApi";

export default function SavingsGoalForm({ goal, onClose, onSave }) {
  const [title, setTitle] = useState(goal ? goal.title : "");
  const [targetAmount, setTargetAmount] = useState(goal ? goal.targetAmount : "");
  const [autoSaving, setAutoSaving] = useState(goal ? goal.autoSaving : null);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setTargetAmount(goal.targetAmount);
      setAutoSaving(goal.autoSaving || null);
    } else {
      setTitle("");
      setTargetAmount("");
      setAutoSaving(null);
    }
  }, [goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      autoSaving?.enabled &&
      (!autoSaving.amount ||
       !autoSaving.frequency ||
       (autoSaving.isUnlimited === false && !autoSaving.timesToRepeat))
    ) {
      alert("Please fill in both amount and frequency for auto saving.");
      return;
    }

    const validatedAutoSaving = autoSaving?.enabled
      ? {
          amount: Number(autoSaving.amount),
          frequency: autoSaving.frequency,
          isUnlimited: autoSaving.isUnlimited ?? true,
          timesToRepeat: autoSaving.isUnlimited ? null : Number(autoSaving.timesToRepeat)
        }
      : null;

    try {
      if (goal) {
        await updateGoal(goal._id, { title, targetAmount, autoSaving: validatedAutoSaving });
      } else {
        await createGoal({ title, targetAmount, autoSaving: validatedAutoSaving });
      }

      onSave();
      onClose();
    } catch (err) {
      alert("Error saving goal");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
      <h3>{goal ? "Edit a saving goal" : "Add a new saving goal"}</h3>

      <input type="text" placeholder="Goal name" value={title} onChange={e => setTitle(e.target.value)} required />
      <br />
      <input type="number" placeholder="Goal amount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required min="0" />
      <br />
      <AutoSavingOption label="Add auto saving to this goal" onChange={setAutoSaving} initialValue={goal?.autoSaving} />
      <br />
      <button type="submit" style={{ marginRight: "10px" }}>Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}



