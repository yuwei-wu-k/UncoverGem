import Axios from "axios";

// Create an axios instance
const http = Axios.create();

// Add a request interceptor
// Used to add an Authorization header to every request, using a token retrieved from localStorage
http.interceptors.request.use(function (config) {
  const token = localStorage.getItem("sessionToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// Add a response interceptor
// Used to check for a 401 status code and redirect to the sign-in page if encountered
http.interceptors.response.use(
  (response) => response, // simply return the response if it's ok
  (error) => {
    if (error.response.status === 401) {
      // or whatever status code you choose
      localStorage.removeItem("sessionToken");
      // then redirect the user to the login page
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default http;
