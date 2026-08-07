import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const textInputId = `${id}-text`;
  const colorInputId = `${id}-color`;

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        id={textInputId}
        name={textInputId}
        value={inputValue}
        onChange={handleInputValue}
      />
      <input
        type="color"
        id={colorInputId}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
      />
    </>
  );
}
