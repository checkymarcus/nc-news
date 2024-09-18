import "./App.css";
import { getAllArticles } from "../apiCalls";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/Articles.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
