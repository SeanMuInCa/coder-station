import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

request.interceptors.request.use(config => {
    //一般是添加token
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('userToken')
    return config
}, error => {
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default request;
