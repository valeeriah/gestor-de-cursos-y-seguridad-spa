import axios from "axios";

// Es vital que diga 'export const' al principio
export const getCourses = async () => {
  try {
    // Usamos una API de prueba (JSONPlaceholder) para simular los cursos
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
    
    // Formateamos los datos para que tengan lo que nuestro componente espera
    return response.data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      teacherId: Math.floor(Math.random() * 10) + 1,
    }));
  } catch (error) {
    throw new Error("No se pudieron cargar los cursos. Inténtalo más tarde.");
  }
};