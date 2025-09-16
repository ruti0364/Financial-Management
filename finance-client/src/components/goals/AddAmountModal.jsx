import React from "react";
import "./AddAmountModal.scss";

export default function AddAmountModal({ goalId, extraAmount, setExtraAmount, onConfirm, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>הוספת סכום ליעד</h3>
        <input type="number" placeholder="כמה להוסיף?" value={extraAmount} onChange={e => setExtraAmount(e.target.value)} />
        <div className="form-actions">
          <button className="btn btn-primary" onClick={() => onConfirm(goalId)}>💾 הוספה</button>
          <button className="btn btn-ghost" onClick={onClose}>❌ ביטול</button>
        </div>
      </div>
    </div>
  );
}
