import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Link } from 'react-router-dom'
import { useTask } from '../context/TaskContext'
dayjs.extend(utc)

function TaskCard({ task }) {
  const { deleteTask } = useTask()

  return (
    <div className="bg-zinc-800 max-w-md w-full p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
      <header className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white leading-tight">
            {task.title}
          </h1>
          <p className="text-gray-400 text-xl mt-1">{task.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Edit
          </Link>
          <Link
            to={`/tasks/${task._id}/colaborator`}
            className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Colaboradores
          </Link>
        </div>
      </header>

      <footer className="pt-2">
        <p className="text-sm text-gray-300 italic">
          Fecha de creación: {dayjs(task.date).utc().format('DD MMMM YYYY')}
        </p>
      </footer>
    </div>
  )
}
export default TaskCard
