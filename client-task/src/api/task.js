import instance from './axios'

export const getTasksRequest = async () => await instance.get('/tasks')

export const getTaskRequest = async id => await instance.get(`/tasks/${id}`)

export const createTaskRequest = async task =>
  await instance.post('/tasks', task)

export const updateTaskRequest = async (id, task) =>
  await instance.put(`/task/${id}`, task)

export const deleteTaskRequest = async id => {
  try {
    const res = await instance.delete(`/tasks/${id}`)
    return res
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
    throw error
  }
}

export const getColaboratorsRequest = async id =>
  await instance.get(`/tasks/${id}/colaborators/list`)

export const searchColaboratorsRequest = async (id, username) => {
  try {
    const response = await instance.get(
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
    const response = await instance.post(`/tasks/${id}/colaborator`, username)
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}

export const deleteColaboratorRequest = async (id, colaboratorId) => {
  try {
    const response = await instance.delete(
      `/tasks/${id}/colaborators/${colaboratorId}`
    )
    return response
  } catch (error) {
    if (error.response) {
      throw error.response.data
    }
  }
}
