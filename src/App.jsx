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
  function handleDeleteButton(id) {
    setListColors(listColors.filter((listColor) => listColor.id !== id));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAddColor={handleAddColor} />
      <ul className="color-list">
        {listColors.map((listColor) => (
          <li key={listColor.id}>
            <Color color={listColor} onDeleteColor={handleDeleteButton} />
          </li>
        ))}
      </ul>
      {listColors.length === 0 && <p>No colors left. Add a new one!</p>}
    </>
  );
}

export default App;
