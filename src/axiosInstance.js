import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// 요청할 때마다 토큰 담아서 요청하도록 함
function addJwtToRequest(config) {
  const jwt = sessionStorage.getItem('jwt');
 console.log("Interceptor JWT:", jwt);
  if(jwt !== null && jwt !== undefined && jwt !== '')
    config.headers['Authorization'] = `Bearer ${jwt}`;

  return config;
}

axiosInstance.interceptors.request.use(
  (config) => addJwtToRequest(config),
  (error) => Promise.reject(error)
)

export default axiosInstance;