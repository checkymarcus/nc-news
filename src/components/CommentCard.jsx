export const CommentCard = ({ comment }) => {
  const { body, author, votes } = comment;

  return (
    <div className="commentcard">
      <p className="commentbody">{body}</p>
      <p className="commentauthor">By {author}</p>
      <p className="votes">Votes: {votes}</p>
    </div>
  );
};
