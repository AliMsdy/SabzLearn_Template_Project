import {
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

const useQueryCall = (
  key: QueryKey,
  { method = "GET", ...config }: AxiosRequestConfig,
  options = {},
  onErrorHandler?: (error: AxiosError) => void,
  queryFunction?: () => Promise<any>,
) =>
  useQuery({
    queryKey: key || [config.url, config.params].filter(Boolean),
    queryFn:
      queryFunction ||
      async function () {
        try {
          const { data } = await axiosInstance.request({
            method,
            ...config,
          });
          return data;
        } catch (error) {
          onErrorHandler!(error as AxiosError);
        }
      },
    ...options,
  });

const useMutateCall = (key: MutationKey, options = {}) =>
  useMutation({
    mutationKey: key,
    mutationFn: ({ method = "POST", ...config }: AxiosRequestConfig) =>
      axiosInstance.request({
        method,
        ...config,
      }),
    ...options,
  });

export { axiosInstance, useMutateCall, useQueryCall };
