import { useState } from 'react'

import FilterBar from '../components/shared/FilterBard'
import PageHeader from '../components/shared/PageHeader'
import SearchInput from '../components/ui/SearchInput'


const MOCK_BOOKS = [
  { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'El amor en los tiempos del cólera', author: 'Gabriel García Márquez' },
]

function Books() {

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    genre: '',
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Libros" description="Gestiona el catálogo y mantén la colección al día." />
      <FilterBar>
        <SearchInput value="" onChange={(e) => e.target.value} placeholder="Buscar por título o autor..." />
      </FilterBar>
      <p>Bienvenido a la página de libros.</p>
    </div>
  )
}

export default Books