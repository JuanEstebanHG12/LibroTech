function PageHeader({ title, description }) {
    return (
        <header className="mb-6">
            <p className="text-sm uppercase font-semibold text-accent">Biblioteca / Administración</p>
            <h1 className="text-[32px] font-display text-heading">{title}</h1>
            {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
        </header>
    )
}

export default PageHeader