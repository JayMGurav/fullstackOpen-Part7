import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

export default { getAllUsers, getUser }