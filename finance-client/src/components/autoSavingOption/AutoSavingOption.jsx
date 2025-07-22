import React, { useState } from 'react';

export default function AutoSavingOption({ label, onChange }) {
    const [enabled, setEnabled] = useState(false);
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setEnabled(checked);

        const newData = {
            enabled: checked,
            amount: checked ? amount : '',
            frequency: checked ? frequency : ''
        };

        onChange && onChange(newData);

        if (!checked) {
            setAmount('');
            setFrequency('');
        }
    };

    const handleAmountChange = (e) => {
        const val = e.target.value;
        setAmount(val);

        onChange && onChange({
            enabled,
            amount: val,
            frequency
        });
    };

    const handleFrequencyChange = (e) => {
        const val = e.target.value;
        setFrequency(val);

        onChange && onChange({
            enabled,
            amount,
            frequency: val
        });
    };

    return (
        <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
            <label>
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={handleCheckboxChange}
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
                                onChange={handleAmountChange}
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
                                onChange={handleFrequencyChange}
                                style={{ marginLeft: "10px" }}
                            >
                                <option value="">Select frequency</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}


