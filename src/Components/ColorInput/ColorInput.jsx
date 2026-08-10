import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, name, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const textInputID = id;
  const colorInputID = `${id}-color`;

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="color-input-container">
      <input
        type="text"
        id={textInputID}
        name={name}
        value={inputValue}
        onChange={handleInputValue}
        className="color-text-input"
      />
      <input
        type="color"
        id={colorInputID}
        value={inputValue}
        onChange={handleInputValue}
        className="color-picker-input"
      />
    </div>
  );
}
