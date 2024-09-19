import "./App.css";
import { getAllArticles } from "../apiCalls";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles.jsx";
import { Homepage } from "./components/Homepage.jsx";
import ArticleDetails from "./components/ArticleDetails.jsx";
import { Comments } from "./components/Comments.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
        <Route path="/articles/:articleId/comments" element={<Comments />} />
      </Routes>
    </>
  );
}

export default App;
