import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useTask } from '../context/TaskContext'

function ColaboratorPage() {
  const {
    formState: { errors }
  } = useForm()
  const { errors: colaboratorsErrors, deleteColaborator } = useTask()
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const { colaborators, getColaborators, searchColaborators, addColaborator } =
    useTask()
  const { id } = useParams()

  useEffect(() => {
    getColaborators(id)
  }, [id])
  const handleSearch = async e => {
    e.preventDefault()
    try {
      const results = await searchColaborators(id, search)
      setSearchResults(results)
    } catch (error) {
      console.error('Error en búsqueda:', error)
    }
  }

  const handleAddColaborator = async username => {
    try {
      const result = await addColaborator(id, { collaborators: username })
      if (result) {
        setSearchResults([])
        setSearch('')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      {/* Buscador */}
      <div className="bg-zinc-800 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Buscar Usuarios</h2>
        {colaboratorsErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar usuarios por nombre..."
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="bg-zinc-800 p-4 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {searchResults.map(user => (
              <div
                key={user._id}
                className="bg-zinc-700 p-4 rounded-md hover:bg-zinc-600 transition-colors"
              >
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-slate-300">{user.email}</p>
                <button
                  onClick={() => handleAddColaborator(user._id)}
                  className="mt-2 bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 w-full"
                >
                  Agregar como colaborador
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Lista de Colaboradores */}
      <div className="bg-zinc-800 p-4 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Colaboradores Actuales</h2>
        {colaborators.length === 0 ? (
          <p className="text-slate-300">No hay colaboradores en esta tarea</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colaborators.map(colaborator => (
              <div
                key={colaborator._id}
                className="bg-zinc-700 p-4 rounded-md hover:bg-zinc-600 transition-colors"
              >
                <h2 className="text-xl font-bold">{colaborator.username}</h2>
                <p className="text-slate-300">{colaborator.email}</p>
                <button
                  onClick={() => {
                    deleteColaborator(id, colaborator._id)
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ColaboratorPage
