import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, addVotesByArticleId } from "../../apiCalls";
import { Comments } from "./Comments"; // Importing the Comments component

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [singleArticle, setArticle] = useState(null); // Initialize as null, assuming it's a single object
  const [currentVotes, setCurrentVotes] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(articleId)
      .then((response) => {
        const article = response.data.article;
        setArticle(article);
        setCurrentVotes(article.votes || 0); // Set initial votes
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load article.");
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = (incVotes) => {
    setCurrentVotes((prevVotes) => prevVotes + incVotes);

    addVotesByArticleId(articleId, { incVotes })
      .then((response) => {
        console.log("Votes updated successfully");
      })
      .catch((error) => {
        console.error("Error updating votes", error);
        setCurrentVotes((prevVotes) => prevVotes - incVotes); // Revert vote change if there's an error
      });
  };

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
          <span> Votes: {article.votes} </span>
          <button onClick={() => handleVote(1)}>+1</button>
          <button onClick={() => handleVote(-1)}>-1</button>
          <Comments />
        </div>
      ))}
    </div>
  );
};

export default ArticleDetails;
