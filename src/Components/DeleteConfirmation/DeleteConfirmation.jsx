import "./DeleteConfirmation.css";

export function DeleteConfirmation({ onCancel, onConfirmDelete }) {
  return (
    <p className="color-card-hightlight">
      Really delete?{" "}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" onClick={onConfirmDelete}>
        Delete
      </button>
    </p>
  );
}
