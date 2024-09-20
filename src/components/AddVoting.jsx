import { addVotesByArticleId } from "../../apiCalls";
import { useState, useEffect } from "react";

export const AddVoting = ({ articleId, votes }) => {
  const [newVotes, setCurrentVotes] = useState(votes);

  const handleVote = (incVotes) => {
    setCurrentVotes((prevVotes) => prevVotes + incVotes);

    addVotesByArticleId(articleId, { incVotes }).then(() => {
      console.log("Votes updated successfully");
    });
  };
  console.log(votes);
  return (
    <div>
      <span>Votes: {newVotes}</span>
      <button onClick={() => handleVote(1)}>+1</button>
      <button onClick={() => handleVote(-1)}>-1</button>
    </div>
  );
};
