import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Link } from 'react-router-dom'
import { useTask } from '../context/TaskContext'
dayjs.extend(utc)

function TaskCard({ task }) {
  const { deleteTask } = useTask()
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold"> {task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(task._id)
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>

      <p className="text-salte-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format('DD-MM-YYYY')}</p>
    </div>
  )
}
export default TaskCard
