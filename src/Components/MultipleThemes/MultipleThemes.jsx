export function MultipleThemes() {
  return (
    <form>
      <label htmlFor="theme-select" className="themes-form">
        Themes
        <select id="theme-select">
          <option value="default-theme">Default-Theme</option>
          <option value="themeId">Cool Theme</option>
        </select>
      </label>
    </form>
  );
}
