import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const destroy = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, get, update, destroy, setToken}