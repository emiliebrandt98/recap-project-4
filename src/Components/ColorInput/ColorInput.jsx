import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="color-input-container">
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
        className="color-text-input"
      />
      <input
        type="color"
        value={inputValue}
        onChange={handleInputValue}
        className="color-picker-input"
      />
    </div>
  );
}
