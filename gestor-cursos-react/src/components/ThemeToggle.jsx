const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle"
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
      title={`Modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? (
        <span className="theme-icon">🌙</span>
      ) : (
        <span className="theme-icon">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
