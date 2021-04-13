import axios from "axios";
import ENV_VARS from "config/env";
import { getAccessToken } from "utils/localAuth";

const apiClient = axios.create({
  baseURL: ENV_VARS.apiAddress,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = getAccessToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiClient;
