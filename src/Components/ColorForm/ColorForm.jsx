import { useId } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm";

const defaultDataValue = {
  role: "role of your color",
  hex: "#f9731a",
  contrastText: "#000000",
};

export default function ColorForm({
  defaultData = defaultDataValue,
  onSubmitButton,
}) {
  const roleId = useId();

  function handleSubmitButton(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmitButton(data);
  }

  return (
    <form onSubmit={handleSubmitButton}>
      <label htmlFor={roleId}>
        Role <br />
        <input
          type="text"
          id={roleId}
          name="role"
          defaultValue={defaultData.role}
        ></input>
      </label>
      <br />

      <label htmlFor="hex-code">
        Hexa
        <br />
        <ColorInput id="hex" defaultValue={defaultData.hex} />
      </label>
      <br />

      <label htmlFor="contrast-text">
        Contrast Text
        <br />
        <ColorInput id="contrastText" defaultValue={defaultData.contrastText} />
      </label>
      <br />

      <button type="submit">Add New Color</button>
    </form>
  );
}
