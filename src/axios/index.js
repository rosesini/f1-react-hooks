import axios from 'axios'

const baseURL = 'http://ergast.com/api'

export default axios.create({
  baseURL
})
