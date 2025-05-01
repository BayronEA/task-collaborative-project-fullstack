import { createContext, useContext, useEffect, useState } from 'react'
import {
  addColaboratorRequest,
  createTaskRequest,
  deleteColaboratorRequest,
  deleteTaskRequest,
  getColaboratorsRequest,
  getTaskRequest,
  getTasksRequest,
  searchColaboratorsRequest,
  updateTaskRequest
} from '../api/task'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}

export function TaskProvider({ children }) {
  const [errors, setErrors] = useState([])
  const [tasks, setTasks] = useState([])
  const [colaborators, setColaborators] = useState([])
  const createTask = async task => {
    const res = await createTaskRequest(task)
  }
  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async id => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 200) {
        setTasks(tasks.filter(task => task._id !== id))
      }
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        return setErrors(error)
      }
      setErrors([error.message])
    }
  }
  const getTask = async id => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
    } catch (error) {
      console.log(error)
    }
  }
  const getColaborators = async id => {
    try {
      const res = await getColaboratorsRequest(id)
      setColaborators(res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  const searchColaborators = async (id, username) => {
    try {
      const res = await searchColaboratorsRequest(id, username)
      return res.data
    } catch (error) {
      console.error('Error en búsqueda:', error)
      throw error
    }
  }
  const addColaborator = async (id, colaboratorId) => {
    try {
      const res = await addColaboratorRequest(id, colaboratorId)
      if (res) {
        await getColaborators(id)
        setErrors([])
        return res
      }
    } catch (error) {
      if (Array.isArray(error)) {
        return setErrors(error)
      }
      setErrors([error.message])
    }
  }
  const deleteColaborator = async (id, colaboratorId) => {
    try {
      const res = await deleteColaboratorRequest(id, colaboratorId)
      if (res.status === 200) {
        setColaborators(
          colaborators.filter(colaborator => colaborator._id !== colaboratorId)
        )
      }
    } catch (error) {
      console.log(error)
      if (Array.isArray(error)) {
        return setErrors(error)
      }
      setErrors([error.message])
    }
  }
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])
  return (
    <TaskContext.Provider
      value={{
        tasks,
        colaborators,
        errors,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        getColaborators,
        searchColaborators,
        addColaborator,
        deleteColaborator
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
