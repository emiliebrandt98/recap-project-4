import { useState } from "react";
import "./Color.css";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";

export default function Color({ color, onDeleteColor }) {
  const { id, role, hex, contrastText } = color;
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card-headline">{hex}</h2>
      <p style={{ color: contrastText }}>{role}</p>
      <p style={{ color: contrastText }}> contrast: {contrastText}</p>
      {isConfirming ? (
        <DeleteConfirmation
          onConfirmDelete={() => {
            onDeleteColor(id);
          }}
          onCancel={() => {
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
