import React, { useState } from "react";
import "./FinanceDatePicker.scss";

const FinanceDatePicker = ({ value, onChange, placeholder = "בחר תאריך" }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(value || "");
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const days = getDaysInMonth(currentMonth, currentYear);

    const handleSelectDate = (date) => {
        const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setSelectedDate(iso);
        onChange(iso);
        setIsOpen(false);
    };


    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const monthNames = [
        "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
        "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];

    return (
        <div className="finance-date-picker">
            <div className="finance-selected" onClick={toggleOpen}>
                {selectedDate
                    ? `${selectedDate.slice(8, 10)}/${selectedDate.slice(5, 7)}/${selectedDate.slice(0, 4)}`
                    : placeholder}
                <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
            </div>
            {isOpen && (
                <div className="calendar-popup">
                    <div className="calendar-header">
                        <button onClick={prevMonth}>&lt;</button>
                        <span>{monthNames[currentMonth]} {currentYear}</span>
                        <button onClick={nextMonth}>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                        {["א", "ב", "ג", "ד", "ה", "ו", "ש"].map((d) => (
                            <div key={d} className="calendar-day-header">{d}</div>
                        ))}
                        {days.map((day) => (
                            <div
                                key={day.toISOString()}
                                className={`calendar-day ${selectedDate === day.toISOString().slice(0, 10) ? "selected" : ""}`}
                                onClick={() => handleSelectDate(day)}
                            >
                                {day.getDate()}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinanceDatePicker;
