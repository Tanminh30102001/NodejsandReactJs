import axios from "axios";
import { toast } from "react-toastify";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

//use cookie for browser
instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
// declare Authorization to headers
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status || 500;
    switch (status) {
      case 400:
        console.log(error.response.data);
        return error.response.data;
      case 401:
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        )
          toast.error("Unauthorized the user. Plase login first!");
        // window.location.href = "/login";
        return error.response.data;
      case 403:
        toast.error("You don't have perrmisson to access this resource!");
        // window.location.href = "/login";
        return error.response.data;
      default:
        break;
    }
  }
);

export default instance;
