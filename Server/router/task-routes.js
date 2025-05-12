import { Router } from 'express'
import { TaskController } from '../controllers/task-controller.js'
import { validateSchema } from '../middleware/validate-middleware.js'
import { authRequired } from '../middleware/validatetoken.js'
import { validateTaskSchema } from '../schemas/task-schema.js'

const taskroutes = Router()

taskroutes.get('/tasks', authRequired, TaskController.getTasks)
taskroutes.get('/tasks/:id', authRequired, TaskController.getTask)
taskroutes.delete('/tasks/:id', authRequired, TaskController.deteletask)
taskroutes.put('/task/:id', authRequired, TaskController.updatetask)
taskroutes.post(
  '/tasks',
  authRequired,
  validateSchema(validateTaskSchema),
  TaskController.createTask
)
taskroutes.post(
  '/tasks/:id/colaborator',
  authRequired,
  TaskController.agregarColaborador
)
taskroutes.get(
  '/tasks/:id/colaborator/search',
  authRequired,
  TaskController.buscarColaborador
)
taskroutes.get(
  '/tasks/:id/colaborators/list',
  authRequired,
  TaskController.obtenerColaboradores
)
taskroutes.delete(
  '/tasks/:id/colaborators/:colaboratorId',
  authRequired,
  TaskController.eliminarColaborador
)

export default taskroutes
