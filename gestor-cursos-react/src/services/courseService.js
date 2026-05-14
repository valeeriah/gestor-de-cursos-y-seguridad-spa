// Es vital que diga 'export const' al principio
export const getCourses = async () => {
  try {
    // Usamos una API de prueba (JSONPlaceholder) para simular los cursos
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    
    // Verificamos que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // Parseamos la respuesta JSON
    const data = await response.json();
    
    // Formateamos los datos para que tengan lo que nuestro componente espera
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.body,
      teacherId: Math.floor(Math.random() * 10) + 1,
    }));
  } catch (error) {
    throw new Error("No se pudieron cargar los cursos. Inténtalo más tarde.");
  }
};