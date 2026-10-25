function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
          React + Vite + Tailwind CSS
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          LibroTech
        </h1>
        <p className="text-slate-400 text-base">
          Frontend inicializado y listo para conectarse con la API de Spring Boot.
        </p>
      </div>
    </div>
  )
}

export default App
