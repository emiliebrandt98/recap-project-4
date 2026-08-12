import { useId } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";
import { SubmitButton } from "../Button/Button";

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
  const labelColor = { color: defaultData.contrastText };

  function handleSubmitButton(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitColor(data);
  }

  return (
    <form onSubmit={handleSubmitButton} className="color-add-form">
      <label htmlFor={roleId} className="form-label" style={labelColor}>
        Role
        <input
          type="text"
          id={roleId}
          name="role"
          defaultValue={defaultData.role}
          className="role-input"
        />
      </label>

      <label htmlFor={hexId} className="form-label" style={labelColor}>
        Hexa
        <br />
        <ColorInput id={hexId} name="hex" defaultValue={defaultData.hex} />
      </label>

      <label htmlFor={contrastTextID} className="form-label" style={labelColor}>
        Contrast Text
        <br />
        <ColorInput
          id={contrastTextID}
          name="contrastText"
          defaultValue={defaultData.contrastText}
        />
      </label>

      <SubmitButton buttonText={buttonText} color={defaultData} />
    </form>
  );
}
