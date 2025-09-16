import React from "react";
import GoalProgressBar from "components/GoalProgressBar/GoalProgressBar";
import "./DesktopTable.scss";

export default function DesktopTable({ goals, onEdit, onDelete, onAddAmount, calculateProgress }) {
  return (
    <div className="desktop-view">
      <div style={{ overflowX: "auto" }}>
        <table className="savings-table">
          <thead>
            <tr><th>שם המטרה</th><th>יעד (ש"ח)</th><th>הוספה אוטומטית</th><th>נצבר (ש"ח)</th><th>התקדמות</th><th>פעולות</th></tr>
          </thead>
          <tbody>
            {goals.map(goal => (
              <tr key={goal._id}>
                <td>{goal.title}</td>
                <td>{goal.targetAmount}</td>
                <td>{goal.autoSaving && goal.autoSaving.frequency !== "none" ? goal.autoSaving.frequency : "❌"}</td>
                <td>{goal.currentAmount}</td>
                <td><GoalProgressBar progress={calculateProgress(goal)} /></td>
                <td>
                  <button className="btn btn-ghost" onClick={() => onEdit(goal)}>✏️ ערוך</button>
                  <button className="btn" onClick={() => onDelete(goal._id)}>🗑️ מחק</button>
                  <button className="btn btn-ghost" onClick={() => onAddAmount(goal._id)}>➕ הוסף סכום</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
