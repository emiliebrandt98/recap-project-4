import { SimpleButton } from "../Button/Button";
import "./DeleteConfirmation.css";

export function DeleteConfirmation({ onCancel, onConfirmDelete, color }) {
  return (
    <div className="delete-option">
      <p className="color-card-hightlight">Really delete? </p>
      <SimpleButton onClick={onCancel} buttonText={"No"} color={color} />
      <SimpleButton
        onClick={onConfirmDelete}
        buttonText={"Yes"}
        color={color}
      />
    </div>
  );
}
