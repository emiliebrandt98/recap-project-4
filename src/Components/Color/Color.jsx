import { useState } from "react";
import "./Color.css";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";

export default function Color({ color, listColors, setListColors }) {
  const { id, role, hex, contrastText } = color;
  const [isConfirming, setIsConfirming] = useState(false);

  function handleDeleteButton(id) {
    setListColors(listColors.filter((listColor) => listColor.id !== id));
  }

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card-headline">{hex}</h2>
      <p style={{ color: contrastText }}>{role}</p>
      <p style={{ color: contrastText }}> contrast: {contrastText}</p>
      {isConfirming ? (
        <DeleteConfirmation
          onDeleteButton={() => {
            handleDeleteButton(id);
          }}
          onIsConfirming={() => {
            setIsConfirming(false);
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsConfirming(true);
          }}
        >
          Delete Color
        </button>
      )}
    </article>
  );
}
