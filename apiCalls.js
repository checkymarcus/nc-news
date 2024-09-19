import axios from "axios";

const api = axios.create({
  baseURL: "https://remi-hill.onrender.com/api",
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
export const getUsers = () => {
  return api.get("/users");
};

export const postCommentByArticleId = (id, commentData) => {
  return api.post(`/articles/${id}/comments`, commentData);
};
