import { useState } from "react";
import "./Color.css";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";
import { CopyToClipboard } from "../CopyToClipboard/CopyToClipboard";
import ColorForm from "../ColorForm/ColorForm";
import { useContrastScore } from "../ContrastCheckerApi/ContrastCheckerApi";
import { SimpleButton } from "../Button/Button";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const { id, role, hex, contrastText } = color;
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const score = useContrastScore(hex, contrastText);
  const buttonColor = { color: contrastText, borderColor: contrastText };

  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <div className="hex-headline">
        <h2 className="color-card-headline">{hex}</h2>
        <CopyToClipboard color={color} style={buttonColor} />
      </div>

      <div className="content-infos">
        <p style={{ color: contrastText }}>
          <strong>{role}</strong>
        </p>
        <p style={{ color: contrastText }}> contrast: {contrastText}</p>

        {score && (
          <div className="overall-score">
            <p className={` overall-score--${score.overall}`}>
              Overall Contrast Score: {score.overall}
            </p>
          </div>
        )}
      </div>

      <div className="delete-edit-button">
        {isConfirming ? (
          <DeleteConfirmation
            color={color}
            onConfirmDelete={() => {
              onDeleteColor(id);
            }}
            onCancel={() => {
              setIsConfirming(false);
            }}
          />
        ) : (
          <SimpleButton
            color={color}
            buttonText={"Delete Color"}
            onClick={() => {
              setIsConfirming(true);
            }}
          />
        )}

        {isEditing ? (
          <div className="edit-form">
            <ColorForm
              color={color}
              buttonText={"Update Color"}
              defaultData={color}
              onSubmitColor={(updatedData) => {
                onEditColor(id, updatedData);
                setIsEditing(false);
              }}
            />
            <SimpleButton
              onClick={() => {
                setIsEditing(false);
              }}
              buttonText={"Cancel"}
              color={color}
            />
          </div>
        ) : (
          <SimpleButton
            onClick={() => {
              setIsEditing(true);
            }}
            buttonText={"Edit Color"}
            color={color}
          />
        )}
      </div>
    </article>
  );
}
