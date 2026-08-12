import useLocalStorageState from "use-local-storage-state";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { initialThemes } from "./lib/themes";
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
  const [activeThemeId, setActiveThemeId] = useLocalStorageState(
    "activeThemeId",
    { defaultValue: initialThemes[0].id },
  );

  // –––––––––––––––––––––– Array-Methodes –––––––––––––––––––––––––

  // Find the active Theme
  const activeTheme =
    themes.find((theme) => theme.id === activeThemeId) || themes[0];

  // Filter to show colors of the active Theme
  const activeColors = listColors.filter((color) =>
    activeTheme.colors.includes(color.id),
  );

  // –––––––––––––––––––––– handle-functions –––––––––––––––––––––––––

  /* Color */
  // New Color are added to listColor(initialColor)
  function handleAddColor(newColor) {
    const createdColor = { id: crypto.randomUUID(), ...newColor };

    setListColors([createdColor, ...listColors]);

    setThemes(
      themes.map((theme) =>
        theme.id === activeThemeId
          ? { ...theme, colors: [...theme.colors, createdColor.id] }
          : theme,
      ),
    );
  }

  // Color is deleted from listColor(initialColor)
  function handleDeleteColor(id) {
    setListColors(listColors.filter((listColor) => listColor.id !== id));
    setThemes(
      themes.map((theme) => ({
        ...theme,
        colors: theme.colors.filter((colorId) => colorId !== id),
      })),
    );
  }

  // Editing ColorCard and replace in listColor(initialColor)
  function handleEditColor(id, updatedData) {
    setListColors(
      listColors.map((listColor) =>
        listColor.id === id ? { ...listColor, ...updatedData } : listColor,
      ),
    );
  }

  /* Theme */
  // New Themes are added to themes
  function handleAddTheme(name) {
    const newTheme = { id: crypto.randomUUID(), name, colors: [] };
    setThemes([...themes, newTheme]);
    setActiveThemeId(newTheme.id);
  }

  // Delete Theme
  function handleDeleteTheme(id) {
    const themeToDelete = themes.find((theme) => theme.id === id);

    const updatedThemes = themes.filter((theme) => theme.id !== id);
    setThemes(updatedThemes);

    // Filter listColors down to ids still referenced by updatedThemes
    const updatedColors = listColors.filter(
      (color) => !themeToDelete.colors.includes(color.id),
    );

    setListColors(updatedColors);
    setActiveThemeId(initialThemes[0].id);
  }

  // Edit Theme
  function handleEditTheme(id, updatedTheme) {
    setThemes(
      themes.map((theme) =>
        theme.id === id ? { ...theme, ...updatedTheme } : theme,
      ),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ThemeSelector
        themes={themes}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditTheme={handleEditTheme}
        value={activeThemeId || ""}
        onChange={(event) => setActiveThemeId(event.target.value)}
      />
      <ColorForm onSubmitColor={handleAddColor} buttonText="Add new Color" />
      <ul className="color-list">
        {activeColors.map((color) => (
          <li key={color.id}>
            <Color
              color={color}
              onDeleteColor={handleDeleteColor}
              onEditColor={handleEditColor}
            />
          </li>
        ))}
      </ul>
      {activeColors.length === 0 && <p>No colors left. Add a new one!</p>}
    </>
  );
}

export default App;
