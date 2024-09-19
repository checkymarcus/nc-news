import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId, postCommentByArticleId } from "../../apiCalls";
import { useParams } from "react-router";
import { CommentCard } from "./CommentCard";
import { UserContext } from "./UserContext";

export const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);
  const { articleId } = useParams();
  const { username } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    getCommentsByArticleId(articleId)
      .then((response) => {
        setAllComments(response.data.articleComments || []);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, [articleId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setPosting(true);

    const commentData = {
      username: username,
      body: newComment,
    };

    const tempComment = {
      username: username,
      body: newComment,
      tempId: Date.now(),
    };

    setAllComments((prevComments) => [tempComment, ...prevComments]);
    setNewComment("");

    postCommentByArticleId(articleId, commentData).then((response) => {
      const newPostedComment = response.data.comment;

      setAllComments((prevComments) =>
        prevComments.map((comment) =>
          comment.tempId === tempComment.tempId ? newPostedComment : comment
        )
      );

      setPosting(false);
    });
  };

  if (loading) {
    return <p>Loading comments...</p>;
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
            <CommentCard key={comment.comment_id} comment={comment}>
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
