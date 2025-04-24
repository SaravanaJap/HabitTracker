import axios from "axios";

const api = axios.create({
    baseURL: 'https://habittracker-shm6.onrender.com/api/v1/',
    headers :{
        'Content-Type':'application/json',
    }
})


//Request Interceptor
api.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        console.log(config );
        return config;
    },
    function(error){
        return Promise.reject(error);   
    }
)

//Response Interceptor

api.interceptors.response.use(
    function(response){
        return response;
    },

    //handling failed responses like expiry
    async function(error){
        const originalRequest = error.config;
        if(error.response.status == 401 && !originalRequest.retry){
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await api.post('http://127.0.0.1:8000/api/v1/token/refresh/',{refresh:refreshToken})
                localStorage.setItem('accessToken',response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return api(originalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api;