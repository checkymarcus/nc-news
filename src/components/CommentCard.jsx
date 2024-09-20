import { useContext } from "react";
import { UserContext } from "./UserContext";
import { deleteCommentById } from "../../apiCalls";
export const CommentCard = ({ comment }) => {
  const { user } = useContext(UserContext);
  const { body, author, votes, comment_id } = comment;

  const handleDelete = (event) => {
    deleteCommentById(comment_id);
  };

  return (
    <div key={comment_id} className="commentcard">
      <p> {comment_id}</p>
      <p className="commentbody">{body}</p>
      <p className="commentauthor">By {author}</p>
      <p className="votes">Votes: {votes}</p>
      {user === author ? (
        <button onClick={(event) => handleDelete(event)}>
          {" "}
          Delete Comment{" "}
        </button>
      ) : null}
    </div>
  );
};
