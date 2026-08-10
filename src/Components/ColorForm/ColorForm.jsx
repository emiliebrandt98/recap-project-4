import { useId } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

const defaultDataValue = {
  role: "role of your color",
  hex: "#f9731a",
  contrastText: "#000000",
};

export default function ColorForm({
  defaultData = defaultDataValue,
  onSubmitColor,
  buttonText,
}) {
  const roleId = useId();
  const hexId = useId();
  const contrastTextID = useId();

  function handleSubmitButton(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form onSubmit={handleSubmitButton} className="color-form">
      <label htmlFor={roleId} className="form-label">
        Role
        <input
          type="text"
          id={roleId}
          name="role"
          defaultValue={defaultData.role}
          className="role-input"
        />
      </label>

      <label htmlFor={hexId} className="form-label">
        Hexa
        <br />
        <ColorInput id={hexId} name="hex" defaultValue={defaultData.hex} />
      </label>

      <label htmlFor={contrastTextID} className="form-label">
        Contrast Text
        <br />
        <ColorInput
          id={contrastTextID}
          name="contrastText"
          defaultValue={defaultData.contrastText}
        />
      </label>

      <button type="submit" className="submit-button">
        {buttonText}
      </button>
    </form>
  );
}
