import { useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const ROUTE_NAMES = {
    '/': 'Libros',
    '/generos': 'Géneros',
    '/editoriales': 'Editoriales',
    '/usuarios': 'Usuarios',
    '/libros': 'Libros',
};

function TopBar() {
    const { pathname } = useLocation();
    const currentPage = ROUTE_NAMES[pathname] || 'Libros'

    return (
        <header className="flex h-16 w-full items-center justify-between border-b border-subtle bg-surface px-6">
            {/* Miga de pan (Breadcrumb) */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
                <span className="text-ink-muted">Panel</span>
                <ChevronRight className="size-4 text-ink-muted" />
                <span className="font-medium text-ink">{currentPage}</span>
            </nav>

            {/* Lado derecho del TopBar */}
            <div className="flex items-center gap-4">
                <ThemeToggle />
            </div>
        </header>
    );
}

export default TopBar;