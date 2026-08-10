import { initialColors } from "./lib/colors";
import { useState } from "react";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  // initialColor is going to change, so we use useState
  const [listColors, setListColors] = useState(initialColors);

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
      <ColorForm onSubmitColor={handleAddColor} buttontext="Add new Color" />
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
