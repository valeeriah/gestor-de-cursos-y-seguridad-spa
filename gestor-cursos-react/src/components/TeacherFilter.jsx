const TeacherFilter = ({ teachers, selectedTeacherId, onTeacherChange }) => {
  return (
    <div className="teacher-filter">
      <label htmlFor="teacher-select">Filtrar por docente:</label>
      <select
        id="teacher-select"
        value={selectedTeacherId}
        onChange={(e) => onTeacherChange(e.target.value === "" ? "" : Number(e.target.value))}
      >
        <option value="">Todos los docentes</option>
        {teachers.map((teacherId) => (
          <option key={teacherId} value={teacherId}>
            Docente {teacherId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherFilter;
