import { useState, useEffect } from 'react'

import { getBooks } from '../api/books'

import FilterBar from '../components/shared/FilterBard'
import PageHeader from '../components/shared/PageHeader'
import SearchInput from '../components/ui/SearchInput'


const MOCK_BOOKS = [
  { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez' },
]

function Books() {
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [loading, setLoading] = useState(true);

  // Estado para los filtros de búsqueda
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    genre: '',
  });

  // Función para actualizar los filtros, tomando el nombre del filtro y su valor agregandolo al estado de filtros
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }

  const fetchBooks = async () => {
    try {
      const data = await getBooks(filters);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchBooks();
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer); // Cleanup the timer on unmount or when filters change
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Libros" description="Gestiona el catálogo y mantén la colección al día." />
      <FilterBar>
        <SearchInput value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder="Buscar por título o autor..." />
      </FilterBar>
      <p>Bienvenido a la página de libros.</p>
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <ul>
          {books.content?.map((book) => (
            <li key={book.id}>
              {book.title} - {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Books