import useLocalStorageState from "use-local-storage-state";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import { ThemeSelector } from "./Components/ThemeSelector/ThemeSelector";
import { useEffect } from "react";
import { Divider } from "./Components/Divider/Divider";
import "./App.css";

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

  useEffect(() => {
    // gathers all color ids that any theme already references
    // array.prototype.flatMap() = instances returns a new array formed by applying a given
    // callback function to each element of the array, and then flattening the result by one level
    const referencedIds = themes.flatMap((theme) => theme.colors);

    // Filters out all colors from listColors whose Id doesn't appear in referencedIds and collect only their Ids
    const orphanedColorIds = listColors
      .filter((color) => !referencedIds.includes(color.id))
      .map((color) => color.id);

    // setThemes is only called if there are actually orphaned colors
    // setThemes  has the orphaned ids added to its existing color list, all other themes remain unchanged
    if (orphanedColorIds.length > 0) {
      setThemes(
        themes.map((theme) =>
          theme.id === initialThemes[0].id
            ? { ...theme, colors: [...theme.colors, ...orphanedColorIds] }
            : theme,
        ),
      );
    }
  }, []);
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
      <h1 className="headline-01">Theme Creator</h1>
      <ThemeSelector
        themes={themes}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditTheme={handleEditTheme}
        value={activeThemeId || ""}
        onChange={(event) => setActiveThemeId(event.target.value)}
      />
      <Divider />
      <ColorForm onSubmitColor={handleAddColor} buttonText="Add new Color" />
      <Divider />
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
