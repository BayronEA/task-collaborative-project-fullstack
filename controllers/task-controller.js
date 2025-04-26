import Task from '../models/task.js'

export class TaskController {
  static async getTasks(req, res) {
    try {
      const tasks = await Task.find({ user: req.user.id }).populate('user')
      res.json(tasks)
    } catch {
      res.status(500).json({ message: 'Error al obtener las tareas' })
    }
  }
  static async createTask(req, res) {
    try {
      const { title, description, date } = req.body
      const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id,
      })
      const taskSaved = await newTask.save()
      res.json(taskSaved)
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la tarea' })
    }
  }
  static async getTask(req, res) {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.id,
      }).populate('user')
      if (!task) return res.status(404).json({ message: 'Task not found' })
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tarea' })
    }
  }
  static async deteletask(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      })
      if (!task) return res.status(404).json({ message: 'Task not found' })
      res.json(task)
    } catch {
      res.status(500).json({ message: 'Error al eliminar la tarea' })
    }
  }
  static async updatetask(req, res) {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      )
      if (!task) return res.status(404).json({ message: 'Task not found' })
      res.json(task)
    } catch {
      res.status(500).json({ message: 'Error al actualizar la tarea' })
    }
  }
}
