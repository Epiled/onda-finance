import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.onda-finance.com",
  timeout: 5000,
});

api.interceptors.response.use(async (response) => {
  return response;
})

