import "./ThemeSelector.css";

export function ThemeSelector({}) {
  return (
    <form>
      <label htmlFor="">
        Themes:
        <select
          id=""
          value={activeThemeId}
          onChange={(event) => setActiveThemeId(event.target.value)}
        >
          {ThemeSelector.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
