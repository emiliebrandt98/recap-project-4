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
}) {
  const roleId = useId();

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

      <label htmlFor="hex" className="form-label">
        Hexa
        <br />
        <ColorInput id="hex" defaultValue={defaultData.hex} />
      </label>

      <label htmlFor="contrastText" className="form-label">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={defaultData.contrastText} />
      </label>

      <button type="submit" className="submit-button">
        Add New Color
      </button>
    </form>
  );
}
