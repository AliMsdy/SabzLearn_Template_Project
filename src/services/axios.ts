import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  //handling Errors
  (error) => {
    const { status, data } = error.response;
    if (status === 404) {
      //handling 404 error
    }
    if (status === 401) {
      // unauthorized user
      data.message
        ? toast.error(data.message, {
            rtl: false,
          })
        : toast.error(data, {
            rtl: false,
          });
      console.log("error from axios", error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
