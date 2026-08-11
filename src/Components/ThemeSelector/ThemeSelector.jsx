import { useId, useState } from "react";
import "./ThemeSelector.css";

export function ThemeSelector({ value, onChange, themes, onAddTheme }) {
  const themeSelectorId = useId();
  const [newThemeName, setNewThemeName] = useState("");

  function handleInputValue(event) {
    setNewThemeName(event.target.value);
  }

  return (
    <form>
      <label htmlFor={themeSelectorId}>
        Themes:
        <select id={themeSelectorId} onChange={onChange} value={value}>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <input type="text" value={newThemeName} onChange={handleInputValue} />
      </label>
      <button
        type="button"
        onClick={() => {
          if (newThemeName.trim() === "") return;
          onAddTheme(newThemeName);
          setNewThemeName("");
        }}
      >
        Add Theme
      </button>
    </form>
  );
}
