import { useId, useState, useEffect } from "react";
import { initialThemes } from "../../lib/themes";
import "./ThemeSelector.css";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";
import { SimpleButton } from "../Button/Button";

export function ThemeSelector({
  value,
  onChange,
  themes,
  onAddTheme,
  onDeleteTheme,
  onEditTheme,
  color,
}) {
  const themeSelectorId = useId();
  const [themeName, setThemeName] = useState("");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const currentTheme = themes.find((theme) => theme.id === value);
  const isDefaultTheme = value === initialThemes[0].id;

  useEffect(() => {
    setIsEditingTheme(false);
    setIsConfirmingDelete(false);
    setThemeName("");
  }, [value]);

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
    <form className="theme-form" onSubmit={(event) => event.preventDefault()}>
      <div className="choose-theme">
        <label className="select-label" htmlFor={themeSelectorId}>
          <strong>Choose Theme:</strong>
        </label>
        <select
          className="select-form"
          id={themeSelectorId}
          onChange={onChange}
          value={value}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theme hinzufügen */}
      <fieldset className="themes-edit">
        <legend>
          <strong>Theme:</strong>
        </legend>
        <input
          className="input-theme"
          type="text"
          value={themeName}
          onChange={(event) => setThemeName(event.target.value)}
          placeholder="Theme Name"
        />
        {/* Theme edit */}
        {isEditingTheme ? (
          <>
            <SimpleButton
              color={color}
              buttonText="Save"
              onClick={handleEditSubmit}
            />
            <SimpleButton
              color={color}
              buttonText="Cancel"
              onClick={() => {
                setIsEditingTheme(false);
                setThemeName("");
              }}
            />
          </>
        ) : (
          <SimpleButton onClick={handleAddSubmit} buttonText="Add Theme" />
        )}

        {!isEditingTheme && (
          <SimpleButton
            onClick={() => {
              setThemeName(currentTheme.name || "");
              setIsEditingTheme(true);
            }}
            disabled={isDefaultTheme}
            buttonText="Edit Theme"
          />
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
          <SimpleButton
            onClick={() => {
              setIsConfirmingDelete(true);
            }}
            disabled={isDefaultTheme}
            buttonText="Delete Theme"
          />
        )}
      </fieldset>
    </form>
  );
}
