// ==============================|| THEME CONFIG  ||============================== //

const config = {
  apiURL: `https://a2zbackend.asgglobalcrm.in`,

  // apiURL: `http://localhost:2002`,
};

export default config;

// // src/api.js
// import axios from 'axios';

// const API = axios.create({
//   // Your backend base URL
// });

// // Interceptor to include token in headers
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default config;
