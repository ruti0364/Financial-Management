import React, { useState } from "react";
import GoalProgressBar from "components/GoalProgressBar/GoalProgressBar";
import "./GoalCard.scss";

export default function GoalCard({ goal, onEdit, onDelete, onAddAmount, calculateProgress }) {
  const [expanded, setExpanded] = useState(false);
  const freq = goal.autoSaving && goal.autoSaving.frequency !== "none" ? goal.autoSaving.frequency : "❌";

  return (
    <article className="goal-card" aria-labelledby={`goal-${goal._id}-title`}>
      <header className="card-head">
        <div className="card-title" id={`goal-${goal._id}-title`}>{goal.title}</div>
        <div className="card-summary">
          <div className="chip"><span className="chip-label">יעד</span><span className="chip-value">{goal.targetAmount ?? '-'}</span></div>
          <div className="chip"><span className="chip-label">נצבר</span><span className="chip-value">{goal.currentAmount ?? 0}</span></div>
          <div className="chip"><span className="chip-label">אוטומטי</span><span className="chip-value">{freq}</span></div>
        </div>

        <div className="card-controls">
          <button className="btn btn-ghost" onClick={() => onEdit(goal)} aria-label={`ערוך ${goal.title}`}>✏️</button>
          <button className="btn" onClick={() => onDelete(goal._id)} aria-label={`מחק ${goal.title}`}>🗑️</button>
          <button className="btn btn-ghost" onClick={() => onAddAmount(goal._id)} aria-label={`הוסף סכום ל${goal.title}`}>➕</button>
          <button className={`expand-toggle ${expanded ? "open" : ""}`} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? "▲" : "▼"}</button>
        </div>
      </header>

      <div className={`card-details ${expanded ? "expanded" : ""}`} id={`details-${goal._id}`}>
        <div className="progress-row">
          <div className="progress-label">התקדמות</div>
          <div className="progress-bar"><GoalProgressBar progress={calculateProgress(goal)} /></div>
        </div>
        <div className="details-grid">
          <div className="detail-item"><div className="detail-label">יעד (ש״ח)</div><div className="detail-value">{goal.targetAmount ?? "-"}</div></div>
          <div className="detail-item"><div className="detail-label">נצטבר (ש״ח)</div><div className="detail-value">{goal.currentAmount ?? 0}</div></div>
          <div className="detail-item"><div className="detail-label">הוספה אוטומטית</div><div className="detail-value">{freq}</div></div>
        </div>
      </div>
    </article>
  );
}

