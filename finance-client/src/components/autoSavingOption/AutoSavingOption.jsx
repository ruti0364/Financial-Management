
import React, { useState, useEffect } from 'react';

export default function AutoSavingOption({ label, onChange, initialValue }) {
  const [enabled, setEnabled] = useState(initialValue?.amount > 0 && initialValue?.frequency !== 'none');
  const [amount, setAmount] = useState(initialValue?.amount || '');
  const [frequency, setFrequency] = useState(initialValue?.frequency || '');
  const [isUnlimited, setIsUnlimited] = useState(initialValue?.isUnlimited ?? true);
  const [timesToRepeat, setTimesToRepeat] = useState(initialValue?.timesToRepeat || '');

  // טעינה מחדש כש־initialValue משתנה (לעריכה למשל)
  useEffect(() => {
    if (initialValue) {
      setEnabled(initialValue.amount > 0 && initialValue.frequency !== 'none');
      setAmount(initialValue.amount || '');
      setFrequency(initialValue.frequency || '');
      setIsUnlimited(initialValue?.isUnlimited ?? true);
      setTimesToRepeat(initialValue?.timesToRepeat || '');
    }
  }, [initialValue]);

  // עדכון ההורה בכל שינוי
  useEffect(() => {
    if (enabled) {
      onChange?.({
        enabled,
        amount,
        frequency,
        isUnlimited,
        timesToRepeat: isUnlimited ? null : timesToRepeat,
      });
    } else {
      onChange?.({ enabled: false });
    }
  }, [enabled, amount, frequency, isUnlimited, timesToRepeat, onChange]);

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        {label || "Enable automatic saving"}
      </label>

      {enabled && (
        <div style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Amount to save:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                placeholder="Enter amount"
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>

          <div>
            <label>
              Frequency:
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>
              <input
                type="radio"
                name="limitOption"
                value="unlimited"
                checked={isUnlimited}
                onChange={() => {
                  setIsUnlimited(true);
                  setTimesToRepeat('');
                }}
              />
              {' '}ללא הגבלה
            </label>

            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name="limitOption"
                value="limited"
                checked={!isUnlimited}
                onChange={() => setIsUnlimited(false)}
              />
              {' '}מספר קבוע של פעמים
            </label>
          </div>

          {!isUnlimited && (
            <div style={{ marginTop: "10px" }}>
              <label>
                מספר תשלומים:
                <input
                  type="number"
                  min="1"
                  value={timesToRepeat}
                  onChange={(e) => setTimesToRepeat(Number(e.target.value))}
                  style={{ marginLeft: "10px" }}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



