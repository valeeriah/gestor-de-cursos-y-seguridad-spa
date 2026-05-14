import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TeacherFilter from "./components/TeacherFilter";
import ThemeToggle from "./components/ThemeToggle";
import CourseList from "./components/CourseList";
import { getCourses } from "./services/courseService";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [favorites, setFavorites] = useLocalStorage("favoriteCourses", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const uniqueTeachers = useMemo(() => {
    const teacherIds = [...new Set(courses.map((course) => course.teacherId))];
    return teacherIds.sort((a, b) => a - b);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(normalizedSearch);
      const matchesTeacher = selectedTeacherId === "" || course.teacherId === selectedTeacherId;
      return matchesSearch && matchesTeacher;
    });
  }, [courses, searchTerm, selectedTeacherId]);

  const handleToggleFavorite = (course) => {
    const exists = favorites.some((fav) => fav.id === course.id);
    if (exists) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== course.id);
      setFavorites(updatedFavorites);
      return;
    }
    setFavorites([...favorites, course]);
  };

  return (
    <main className="app">
      <div className="app-header-top">
        <Header />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <section className="summary">
        <p>Total de cursos: {courses.length}</p>
        <p>Favoritos: {favorites.length}</p>
      </section>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <TeacherFilter
        teachers={uniqueTeachers}
        selectedTeacherId={selectedTeacherId}
        onTeacherChange={setSelectedTeacherId}
      />

      {loading && <p className="message">Cargando cursos...</p>}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button type="button" onClick={loadCourses}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <CourseList
          courses={filteredCourses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </main>
  );
}

export default App;