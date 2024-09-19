import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../../apiCalls";
import { useParams } from "react-router";
import { CommentCard } from "./CommentCard";

export const Comments = () => {
  const [allComments, setAllComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const { articleId } = useParams();

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
  }, [articleId]);

  console.log(allComments);

  return (
    <div className="allcomments">
      <h1>Comments</h1>

      {allComments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment}>
          <p>{comment.body}</p>
        </CommentCard>
      ))}
    </div>
  );
};
