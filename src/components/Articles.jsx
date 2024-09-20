import { getAllArticles } from "../../apiCalls";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";
import { Topics } from "./Topics";

const Articles = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllArticles()
      .then((response) => {
        const filteredArticles = response.data.articles.filter(
          (article) => !topic || topic === "All" || article.topic === topic
        );
        setArticles(filteredArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles.");
        setIsLoading(false);
      });
  }, [topic]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className="allarticles">
      <Topics />
      <h1>Articles for Topic: {topic ? topic : "All"}</h1>

      {articles.length > 0 ? (
        articles.map((article) => (
          <Link key={article.article_id} to={`/articles/${article.article_id}`}>
            <ArticleCard
              image={article.article_img_url}
              title={article.title}
              author={article.author}
              topic={article.topic}
              date={article.created_at}
              votes={article.votes}
              article_id={article.article_id}
            />
          </Link>
        ))
      ) : (
        <p>No articles found for this topic.</p>
      )}
    </div>
  );
};

export default Articles;
