import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `https://kengash.pythonanywhere.com/api/v1/`,
    headers: {
        "Content-Type": "application/json"
    }
})


axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    if(token) request.headers.Authorization = `Token ${token}`
    return request
})

axiosInstance.interceptors.response.use((response) => {
    return response
})

export default axiosInstance