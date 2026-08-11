import { useId, useState } from "react";
import { initialThemes } from "../../lib/themes";
import "./ThemeSelector.css";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";

export function ThemeSelector({
  value,
  onChange,
  themes,
  onAddTheme,
  onDeleteTheme,
  onEditTheme,
}) {
  const themeSelectorId = useId();
  const [themeName, setThemeName] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const currentTheme = themes.find((theme) => theme.id === value);

  function handleAddSubmit() {
    if (themeName.trim() === "") return;
    onAddTheme(themeName.trim());
    setThemeName("");
  }

  function handleEditSubmit() {
    if (themeName.trim() === "") return;
    onEditTheme(value, { name: themeName });
    setIsEditingTheme(false);
    setThemeName("");
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={themeSelectorId}>
        Theme Name:
        <select id={themeSelectorId} onChange={onChange} value={value}>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </label>

      {/* Theme hinzufügen */}
      <label>
        <input
          type="text"
          value={themeName}
          onChange={(event) => setThemeName(event.target.value)}
          placeholder="Theme Name"
        />
      </label>

      {/* Theme edit */}
      {isEditingTheme ? (
        <>
          <button type="button" onClick={handleEditSubmit}>
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditingTheme(false);
              setThemeName("");
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button type="button" onClick={handleAddSubmit}>
          Add Theme
        </button>
      )}

      {!isEditingTheme && (
        <button
          type="button"
          onClick={() => {
            setThemeName(currentTheme?.name || "");
            setIsEditingTheme(true);
          }}
          disabled={value === initialThemes[0].id}
        >
          Edit Button
        </button>
      )}

      {/* Theme löschen */}
      {isConfirmingDelete ? (
        <DeleteConfirmation
          onConfirmDelete={() => {
            onDeleteTheme(value);
            setIsConfirmingDelete(false);
          }}
          onCancel={() => {
            setIsConfirmingDelete(false);
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsConfirmingDelete(true);
          }}
          disabled={value === initialThemes[0].id}
        >
          Delete Theme
        </button>
      )}
    </form>
  );
}
