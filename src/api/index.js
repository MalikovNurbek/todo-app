import axios from "axios"


export const postUser = (data, uid) => {
  return axios.put(`/users/${uid}.json`, data)
}

export const getUsers = () => {
  return axios.get('/users.json')
}


export const createTodo = (data, uid, id) => {
  return axios.put(`/todos/${uid}/${id}.json`, data)
}

export const editTodo = (data, uid, id) => {
  return axios.patch(`/todos/${uid}/${id}.json`, data)
}

export const getTodos = (uid) => {
  return axios.get(`/todos/${uid}.json`)
}

export const deleteTodo = (uid, id) => {
  return axios.delete(`/todos/${uid}/${id}.json`)
}

export const patchTodo = (data, uid ) => {
  return axios.patch(`/todos/${uid}/${data.id}.json`, data)
}
