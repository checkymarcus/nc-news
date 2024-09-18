import { Link } from "react-router-dom";
import { useState } from "react";

export const Homepage = () => {
  const [username, setUsername] = useState("");
  const handleClick = (e) => {
    setUsername(e.target.value);
  };
  return (
    <div className="header">
      <input
        type="text"
        onChange={handleClick}
        value={username}
        placeholder="Enter username"
      ></input>
      <Link to="/articles" state={{ username }}>
        <button className="text">Create Account</button>
      </Link>
    </div>
  );
};
