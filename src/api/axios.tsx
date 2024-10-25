import axios from "axios";

export const api = axios.create({
  baseURL: "https://todo-caio.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
