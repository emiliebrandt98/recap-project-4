import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { initialThemes } from "./lib/themes";
import { useState } from "react";
import { ThemeSelector } from "./Components/ThemeSelector/ThemeSelector";

function App() {
  // –––––––––––––––––––––– UseStates –––––––––––––––––––––––––

  // initialColor is going to change, Theme is now saved to localStorage
  const [listColors, setListColors] = useLocalStorageState("listColors", {
    defaultValue: initialColors,
  });

  // List of all Themes
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  // Current Theme
  const [activeThemeId, setActiveThemeId] = useState(initialThemes[0].id);

  // –––––––––––––––––––––– Array-Methodes –––––––––––––––––––––––––

  // Find the active Theme
  const activeTheme = themes.find((theme) => theme.id === activeThemeId);

  // Filter to show colors of the active Theme
  const activeColors = initialColors.filter((color) =>
    activeTheme.colors.includes(color.id),
  );

  // –––––––––––––––––––––– handle-functions –––––––––––––––––––––––––

  // New Color are added to listColor(initialColor)
  function handleAddColor(newColor) {
    setListColors([{ id: crypto.randomUUID(), ...newColor }, ...listColors]);
  }

  // Color is deleted from listColor(initialColor)
  function handleDeleteColor(id) {
    setListColors(listColors.filter((listColor) => listColor.id !== id));
  }

  // Editing ColorCard and replace in listColor(initialColor)
  function handleEditColor(id, updatedData) {
    setListColors(
      listColors.map((listColor) =>
        listColor.id === id ? { ...listColor, ...updatedData } : listColor,
      ),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeSelector />
      <ColorForm onSubmitColor={handleAddColor} buttonText="Add new Color" />
      <ul className="color-list">
        {listColors.map((listColor) => (
          <li key={listColor.id}>
            <Color
              color={listColor}
              onDeleteColor={handleDeleteColor}
              onEditColor={handleEditColor}
            />
          </li>
        ))}
      </ul>
      {listColors.length === 0 && <p>No colors left. Add a new one!</p>}
    </>
  );
}

export default App;
