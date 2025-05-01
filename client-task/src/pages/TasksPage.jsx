import { useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import { useTask } from '../context/TaskContext'

function TaskPage() {
  const { getTasks, tasks } = useTask()
  const { errors: colaboratorsErrors } = useTask()
  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return <h1>No tasks</h1>
  return (
    <div className="flex flex-col gap-4">
      {colaboratorsErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {tasks.map(task => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  )
}

export default TaskPage
