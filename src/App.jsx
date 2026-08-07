import { initialColors } from "./lib/colors";
import { useState } from "react";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [listColors, setListColors] = useState(initialColors);

  function handleAddColor() {
    setListColors([{ id: crypto.randomUUID(), ...newColor }, ...listColors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitButton={handleAddColor} />
      <ul className="color-list">
        {listColors.map((listColor) => (
          <li key={listColor.id}>
            <Color color={listColor} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
