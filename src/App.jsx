import "./App.css";
import { getAllArticles } from "../apiCalls";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles.jsx";
import { Homepage } from "./components/Homepage.jsx";
import ArticleDetails from "./components/ArticleDetails.jsx";
import { Comments } from "./components/Comments.jsx";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
