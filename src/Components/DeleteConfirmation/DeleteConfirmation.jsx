import "./DeleteConfirmation.css";

export function DeleteConfirmation({ onIsConfirming, onDeleteButton }) {
  return (
    <>
      <p className="color-card-hightlight">
        Really delete?{" "}
        <button type="button" onClick={onIsConfirming}>
          Cancel
        </button>
        <button type="button" onClick={onDeleteButton}>
          Delete
        </button>
      </p>
    </>
  );
}
