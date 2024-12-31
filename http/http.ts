import axios from "axios";
import { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
});

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signUp = async (data: User): Promise<AxiosResponse> => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "api/auth/signup",
      data,
    });
    return res;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const createProduct = async (data: FormData): Promise<AxiosResponse> => {
  console.log(process.env.NEXTAUTH_URL);
  const url = "/api/products";
  console.log("Request URL:", axiosInstance.defaults.baseURL + url);
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "api/products",
      data,
    });
    return res;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw new Error("An unexpected error occurred.");
  }
};
