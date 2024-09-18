import axios from "axios";

const api = axios.create({
  baseURL: "https://remi-hill.onrender.com/api",
  timeout: 5000,
});

export const getAllArticles = () => {
  return api.get("/articles");
};
