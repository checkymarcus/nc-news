import { getAllArticles } from "../../apiCalls";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Articles = () => {
  const { user } = useContext(UserContext);
  const [allArticles, setAllArticles] = useState({ articles: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllArticles()
      .then((response) => {
        setAllArticles(response.data);
        setIsLoading(false);
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
      <h1> Hello {user}! View all Articles below </h1>

      {allArticles.articles.map((article) => (
        <Link key={article.article_id} to={`/articles/${article.article_id}`}>
          <ArticleCard
            key={article.article_id}
            image={article.article_img_url}
            title={article.title}
            author={article.author}
            topic={article.topic}
            date={article.created_at}
            votes={article.votes}
            article_id={article.article_id}
          />
        </Link>
      ))}
    </div>
  );
};

export default Articles;
