import { useState, useEffect, useContext } from "react";
import {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} from "../../apiCalls";
import { useParams } from "react-router";
import { CommentCard } from "./CommentCard";
import { UserContext } from "./UserContext";

export const Comments = () => {
  const [reload, setReload] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const { articleId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getCommentsByArticleId(articleId)
      .then((response) => {
        setAllComments(response.data.articleComments);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, [articleId, reload]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setPosting(true);

    const commentData = {
      username: user,
      body: newComment,
    };

    setAllComments((prevComments) => [commentData, ...prevComments]);
    setNewComment("");

    postCommentByArticleId(articleId, commentData)
      .then((response) => {
        const newPostedComment = response.data.comment;

        setAllComments((prevComments) =>
          prevComments.map((comment) =>
            comment === commentData ? newPostedComment : comment
          )
        );
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);

        setAllComments((prevComments) =>
          prevComments.filter((comment) => comment !== commentData)
        );
      })
      .finally(() => {
        setPosting(false);
      });
  };
  const handleCommentDelete = (commentId) => {
    deleteCommentById(commentId);
    setAllComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
    setReload((prev) => prev + 1);
  };

  if (loading) {
    setTimeout(() => {
      5000;
      return <p>Loading comments...</p>;
    });
  }
  if (posting) {
    return <p> Posting comment... </p>;
  }

  return (
    <div className="allcomments">
      <h1>Comments</h1>

      <form onSubmit={handleSubmitComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="5"
          required
        />
        <br />
        <button type="submit" disabled={posting}>
          {posting ? "Posting..." : "Post Comment"}
        </button>
        {error && <p>{error}</p>}
      </form>

      {allComments.length > 0 ? (
        allComments.map((comment) =>
          comment && comment.body ? (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              onDelete={handleCommentDelete}
            >
              <p>{comment.body}</p>
            </CommentCard>
          ) : null
        )
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};
