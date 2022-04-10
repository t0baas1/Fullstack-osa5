import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const url  = baseUrl + '/' + id
  console.log(url)
  console.log('tulee updateen')
  const response = await axios.put(url, newObject)
  console.log(response.data)
  console.log('request toimii')
  return response.data
}


const deleteBlog = async (id) => {
  const url  = baseUrl + '/' + id
  console.log(url)
  const response = await axios.delete(url)
  return response.data
}


export default { getAll, create, update, setToken, deleteBlog }