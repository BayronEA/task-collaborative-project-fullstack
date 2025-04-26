function TaskCard({ task }) {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold"> {task.title}</h1>
      <div>
        <button>Delete</button>
        <button>Edit</button>
      </div>
      <p className="text-salte-300">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  )
}
export default TaskCard
