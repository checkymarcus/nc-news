import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../../apiCalls";
import { Link } from "react-router-dom";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [singleArticle, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(articleId).then((response) => {
      setArticle(response.data.article);
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
          <Link
            key={article.article_id}
            to={`/articles/${article.article_id}/comments`}
          >
            <button> View All Comments </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
