import { getAllArticles } from "../../apiCalls";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Articles = () => {
  const location = useLocation();
  const { username } = location.state || { username: "Guest" };
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
      <h1> Hello {username}! View all Articles below </h1>

      {allArticles.articles.map((article) => (
        <Link key={article.article_id} to={`/articles/${article.article_id}`}>
          <ArticleCard
            key={article.article_id}
            image={article.article_img_url}
            title={article.title}
            author={article.author}
            topic={article.topic}
            date={article.created_at}
          />
        </Link>
      ))}
    </div>
  );
};

export default Articles;
