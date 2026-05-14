import CourseCard from "./CourseCard";

const CourseList = ({ courses, favorites, onToggleFavorite }) => {
  return (
    <div
      className="course-list"
      role="region"
      aria-live="polite"
      aria-label="Resultados de búsqueda"
    >
      {courses.length === 0 ? (
        <p className="message">No se encontraron cursos.</p>
      ) : (
        courses.map((course) => {
          const isFavorite = favorites.some((fav) => fav.id === course.id);
          return (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })
      )}
    </div>
  );
};

export default CourseList;