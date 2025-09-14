
import React, { useState, useEffect } from "react";
import AutoSavingOption from "../autoSavingOption/AutoSavingOption";
import { createGoal, updateGoal } from "api/goalApi";
import "./SavingsGoalForm.scss";

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
      alert("אנא מלאי סכום ותדירות להוספה אוטומטית");
      return;
    }

    const validatedAutoSaving = autoSaving?.enabled
      ? {
        amount: Number(autoSaving.amount),
        frequency: autoSaving.frequency,
        isUnlimited: autoSaving.isUnlimited ?? true,
        timesToRepeat: autoSaving.isUnlimited ? null : Number(autoSaving.timesToRepeat),
      }
      : null;

    try {
      if (goal) {
        await updateGoal(goal._id, {
          title,
          targetAmount,
          autoSaving: validatedAutoSaving,
        });
      } else {
        await createGoal({ title, targetAmount, autoSaving: validatedAutoSaving });
      }

      onSave();
      onClose();
    } catch (err) {
      alert("שגיאה בשמירת יעד");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{goal ? " עריכת יעד חיסכון" : " הוספת יעד חיסכון חדש"}</h3>

        <form onSubmit={handleSubmit} className="goal-form">
          <label>שם היעד</label>
          <input
            type="text"
            placeholder="לדוגמה: חופשה / רכב חדש"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>סכום יעד</label>
          <input
            type="number"
            placeholder="לדוגמה: 5000"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min="0"
          />

          <AutoSavingOption
            label="הוספה אוטומטית ליעד"
            onChange={setAutoSaving}
            initialValue={goal?.autoSaving}
          />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              💾 שמירה
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              ❌ ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import AutoSavingOption from "../autoSavingOption/AutoSavingOption";
// import { createGoal, updateGoal } from "api/goalApi";
// import Modal from "./modal";
// import "./SavingsGoalForm.scss";


// export default function SavingsGoalForm({ goal, onClose, onSave }) {
//   const [title, setTitle] = useState(goal ? goal.title : "");
//   const [targetAmount, setTargetAmount] = useState(goal ? goal.targetAmount : "");
//   const [autoSaving, setAutoSaving] = useState(goal ? goal.autoSaving : null);

//   useEffect(() => {
//     if (goal) {
//       setTitle(goal.title);
//       setTargetAmount(goal.targetAmount);
//       setAutoSaving(goal.autoSaving || null);
//     } else {
//       setTitle("");
//       setTargetAmount("");
//       setAutoSaving(null);
//     }
//   }, [goal]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       autoSaving?.enabled &&
//       (!autoSaving.amount ||
//         !autoSaving.frequency ||
//         (autoSaving.isUnlimited === false && !autoSaving.timesToRepeat))
//     ) {
//       alert("אנא מלאי סכום ותדירות להוספה אוטומטית");
//       return;
//     }

//     const validatedAutoSaving = autoSaving?.enabled
//       ? {
//           amount: Number(autoSaving.amount),
//           frequency: autoSaving.frequency,
//           isUnlimited: autoSaving.isUnlimited ?? true,
//           timesToRepeat: autoSaving.isUnlimited ? null : Number(autoSaving.timesToRepeat),
//         }
//       : null;

//     try {
//       if (goal) {
//         await updateGoal(goal._id, { title, targetAmount, autoSaving: validatedAutoSaving });
//       } else {
//         await createGoal({ title, targetAmount, autoSaving: validatedAutoSaving });
//       }

//       onSave();
//       onClose();
//     } catch (err) {
//       alert("שגיאה בשמירת יעד");
//     }
//   };

//   return (
//     <Modal title={goal ? " עריכת יעד חיסכון" : " הוספת יעד חיסכון חדש"} onClose={onClose}>
//       <form onSubmit={handleSubmit} className="goal-form">
//         <label>שם היעד</label>
//         <input
//           type="text"
//           placeholder="לדוגמה: חופשה / רכב חדש"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <label>סכום יעד</label>
//         <input
//           type="number"
//           placeholder="לדוגמה: 5000"
//           value={targetAmount}
//           onChange={(e) => setTargetAmount(e.target.value)}
//           required
//           min="0"
//         />

//         <AutoSavingOption
//           label="הוספה אוטומטית ליעד"
//           onChange={setAutoSaving}
//           initialValue={goal?.autoSaving}
//         />

//         <div className="form-actions">
//           <button type="submit" className="btn btn-primary">💾 שמירה</button>
//           <button type="button" className="btn btn-ghost" onClick={onClose}>❌ ביטול</button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

