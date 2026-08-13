import "./Button.css";

export function SimpleButton({ color, buttonText, onClick, disabled }) {
  const textColor = color?.contrastText || { color: "#022b3b" };

  const buttonColor = {
    color: textColor,
    borderColor: textColor,
  };

  return (
    <button
      className="button"
      style={buttonColor}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}

export function SubmitButton({ color, buttonText, onClick, disabled }) {
  const textColor = color?.contrastText || { color: "#022b3b" };

  const buttonColor = {
    color: textColor,
    borderColor: textColor,
  };

  return (
    <button
      className="button"
      style={buttonColor}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
