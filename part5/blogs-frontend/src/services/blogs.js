import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) =>{
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const updateLike = (newLikes, id) => {
  const likesObject = {
    likes: newLikes
  }
  const response = axios.put(`${baseUrl}/${id}`, likesObject)
  return response.data
}

const deleteBlog = (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, updateLike, deleteBlog }