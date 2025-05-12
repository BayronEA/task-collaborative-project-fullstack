import Task from '../models/task.js'
import User from '../models/user.js'

export class TaskController {
  static async getTasks(req, res) {
    try {
      const tasks = await Task.find({
        $or: [{ user: req.user.id }, { collaborators: req.user.id }],
      }).populate('user')
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
        $or: [{ user: req.user.id }, { collaborators: req.user.id }],
      }).populate('user')
      if (!task) return res.status(404).json({ message: 'Task not found' })
      res.json(task)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la tarea' })
    }
  }
  static async deteletask(req, res) {
    try {
      const { id } = req.params
      const tarea = await Task.findById(id)

      if (tarea.user.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: 'Solo el creador puede eliminar esta tarea' })
      }
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
      const task = await Task.findById(req.params.id)

      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }

      // Verificación de permisos
      if (
        task.user.toString() !== req.user.id &&
        !task.collaborators.includes(req.user.id)
      ) {
        return res
          .status(403)
          .json({ message: 'No tienes permisos para editar esta tarea' })
      }

      // Ahora sí actualizamos
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

      res.json(updatedTask)
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la tarea' })
    }
  }
  static async agregarColaborador(req, res) {
    try {
      const { id } = req.params // id de la tarea
      const { collaborators } = req.body // id del colaborador a agregar
      const tarea = await Task.findById(id)

      if (!tarea) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
      }

      if (tarea.user.toString() !== req.user.id) {
        res
          .status(403)
          .json({ message: 'Solo el creador puede invitar colaboradores' })
        return
      }
      if (!collaborators) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      if (tarea.collaborators.includes(collaborators)) {
        return res.status(400).json({ message: 'El usuario ya es colaborador' })
      }

      tarea.collaborators.push(collaborators)
      await tarea.save()

      res.json({ message: 'Colaborador agregado exitosamente' })
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar colaborador' })
    }
  }
  static async obtenerColaboradores(req, res) {
    try {
      const { id } = req.params
      const tarea = await Task.findById(id).populate(
        'collaborators',
        '-password'
      )
      if (!tarea) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
      }
      res.json(tarea.collaborators)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener colaboradores' })
    }
  }
  static async buscarColaborador(req, res) {
    try {
      const { search } = req.query
      const taskId = req.params.id
      if (!search) {
        return res
          .status(400)
          .json({ message: 'Se requiere un término de búsqueda' })
      }
      const tarea = await Task.findById(taskId)
      if (!tarea)
        return res.status(404).json({ message: 'Tarea no encontrada' })

      const excludeIds = [tarea.user, ...tarea.collaborators.map((id) => id)]

      if (search) {
        const users = await User.find({
          _id: { $nin: excludeIds },
          username: { $regex: search, $options: 'i' },
        }).select('-password')
        res.json(users)
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error al buscar usuarios', error: error.message })
    }
  }
  static async eliminarColaborador(req, res) {
    try {
      const { id, colaboratorId } = req.params
      const tarea = await Task.findById(id)
      if (!tarea) {
        return res.status(404).json({ message: 'Tarea no encontrada' })
      }
      if (
        tarea.user.toString() !== req.user.id &&
        colaboratorId !== req.user.id
      ) {
        return res.status(403).json({
          message:
            'Solo el creador o el propio colaborador puede eliminarse de la tarea',
        })
      }
      tarea.collaborators.pull(colaboratorId)
      await tarea.save()
      return res
        .status(200)
        .json({ message: 'Colaborador eliminado exitosamente' })
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar colaborador' })
    }
  }
}
