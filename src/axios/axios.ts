import axios from 'axios';

const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: "http://localhost:8000/api",
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(`Request made to ${config.url} with data:`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // console.error(`Error: ${error.response.status} - ${error.response.data.error}`);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
