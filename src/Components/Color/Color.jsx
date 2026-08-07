import "./Color.css";

export default function Color({ color }) {
  const { role, hex, contrastText } = color;
  return (
    <article className="color-card" style={{ backgroundColor: hex }}>
      <h2 className="color-card-headline">{hex}</h2>
      <p style={{ color: contrastText }}>{role}</p>
      <p style={{ color: contrastText }}>{contrastText}</p>
    </article>
  );
}
