import { getAllArticles } from "../../apiCalls";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";

const Articles = () => {
  const [allArticles, setAllArticles] = useState({ articles: [] });
  const [error, setError] = useState(null);
  useEffect(() => {
    getAllArticles()
      .then((response) => {
        setAllArticles(response.data);
      })

      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  console.log(allArticles.articles);
  return (
    <ArticleCard>
      <div className="allarticles">
        {allArticles.articles.map((article) => (
          <div key={article.article_id}>
            <p className="name">{article.title}</p>
            <p className="author"> {article.author}</p>
            <img className="image" src={article.article_img_url}></img>
          </div>
        ))}
      </div>
    </ArticleCard>
  );
};
export default Articles;
