import axios from 'axios'

export const source = axios.CancelToken.source()

export default axios.create({
    baseURL: 'https://social-c.herokuapp.com'
})