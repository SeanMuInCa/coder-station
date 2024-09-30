import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
})

request.interceptors.request.use(config => {
    //一般是添加token
    const token = localStorage.getItem('userToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
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
