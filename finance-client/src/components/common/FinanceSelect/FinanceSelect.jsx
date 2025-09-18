import React, { useState, useRef, useEffect } from "react";
import "./FinanceSelect.scss";

const FinanceSelect = ({ options = [], value, onChange, placeholder = "בחר אפשרות" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (val) => {
    onChange(val); // שולח את value בלבד
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <div className="finance-select" ref={wrapperRef}>
      <div className="finance-selected" onClick={handleToggle}>
        {selectedLabel || placeholder}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
      </div>
      {isOpen && (
        <ul className="finance-options">
          {options.map((opt) => (
            <li key={opt.value} onClick={() => handleSelect(opt.value)}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FinanceSelect;
