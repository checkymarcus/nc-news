import axios from "axios";

const api = axios.create({
  baseURL: "https://remi-hill.onrender.com/api",
  timeout: 5000,
});

export const getAllArticles = () => {
  return api.get("/articles");
};

export const getArticleById = (id) => {
  return api.get(`/articles/${id}`);
};

export const getCommentsByArticleId = (id) => {
  return api.get(`articles/${id}/comments`);
};

export const addVotesByArticleId = (id, voteChange) => {
  return api.patch(`articles/${id}`, voteChange);
};
