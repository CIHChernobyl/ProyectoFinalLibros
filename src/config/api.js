const API_BASE_URL = 'https://reactnd-books-api.udacity.com';
const API_TOKEN = 'whatever-you-want';

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los libros');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en fetchBooks:', error);
    return [];
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books?search=${query}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    if (!response.ok) {
      throw new Error('Error en la búsqueda de libros');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en searchBooks:', error);
    return [];
  }
};
