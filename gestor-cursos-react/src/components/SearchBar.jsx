const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <section
      className="search-container"
      role="search"
      aria-labelledby="search-label"
    >
      <label id="search-label" htmlFor="search">
        Buscar curso:
      </label>
      <input
        id="search"
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Ejemplo: programación, seguridad, react..."
        maxLength={50}
        aria-describedby="search-help"
      />
      <span
        id="search-help"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        Escribe el nombre o tema del curso para filtrar la lista de resultados.
      </span>
    </section>
  );
};

export default SearchBar;