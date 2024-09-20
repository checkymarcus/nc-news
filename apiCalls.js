import axios from "axios";

const api = axios.create({
  baseURL: "https://remi-hill.onrender.com/api",
});

export const getAllArticles = (topic) => {
  const url = topic ? `/articles?topic=${topic}` : "/articles";

  return api.get(url);
};

export const getArticleById = (id) => {
  return api.get(`/articles/${id}`);
};

export const getCommentsByArticleId = (id) => {
  return api.get(`articles/${id}/comments`);
};

export const addVotesByArticleId = (id, incVotes) => {
  return api.patch(`articles/${id}`, incVotes);
};
export const getUsers = () => {
  return api.get("/users");
};

export const postCommentByArticleId = (id, commentData) => {
  return api.post(`/articles/${id}/comments`, commentData);
};

export const deleteCommentById = (id) => {
  return api.delete(`/comments/${id}`);
};

export const getTopics = () => {
  return api.get("/topics");
};
