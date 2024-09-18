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
    <div className="allarticles">
      {allArticles.articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          image={article.article_img_url}
          title={article.title}
          author={article.author}
          topic={article.topic}
          date={article.created_at}
        />
      ))}
    </div>
  );
};

export default Articles;
