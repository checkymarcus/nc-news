import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, addVotesByArticleId } from "../../apiCalls";
import { Comments } from "./Comments";
import { AddVoting } from "./AddVoting";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [singleArticle, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(articleId)
      .then((response) => {
        const article = response.data.article;
        setArticle(article);

        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article.");
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="article-details">
      {singleArticle.map((article) => (
        <div key={article.article_id} className="article-section">
          <h2>{article.title}</h2>
          {article.article_img_url && <img src={article.article_img_url} />}
          <p>{article.body}</p>
          <p>By {article.author}</p>
          <p>
            Published on {new Date(article.created_at).toLocaleDateString()}
          </p>
          <AddVoting articleId={article.article_id} votes={article.votes} />

          <Comments />
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
