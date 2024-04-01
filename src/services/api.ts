import axios, { AxiosError } from "axios";

export const setupAPIClient = (ctx = undefined) => {
  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  return api;
};
