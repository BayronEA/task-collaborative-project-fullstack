import axios from './axios'

export const getTasksRequest = async () => await axios.get('/tasks')

export const getTaskRequest = async id => await axios.get(`/tasks/${id}`)

export const createTaskRequest = async task => await axios.post('/tasks', task)

export const updateTaskRequest = async (id, task) =>
  await axios.put(`/task/${id}`, task)

export const deleteTaskRequest = async id => {
  try {
    const res = await axios.delete(`/tasks/${id}`)
    return res
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}

export const getColaboratorsRequest = async id =>
  await axios.get(`/tasks/${id}/colaborators/list`)

export const searchColaboratorsRequest = async (id, username) => {
  try {
    const response = await axios.get(
      `/tasks/${id}/colaborator/search?search=${username}`
    )
    return response
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}
export const addColaboratorRequest = async (id, username) => {
  try {
    const response = await axios.post(`/tasks/${id}/colaborator`, username)
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}

export const deleteColaboratorRequest = async (id, colaboratorId) => {
  try {
    const response = await axios.delete(
      `/tasks/${id}/colaborators/${colaboratorId}`
    )
    return response
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}
