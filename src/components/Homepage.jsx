import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { getUsers } from "../../apiCalls";

export const Homepage = () => {
  const { username, setUsername } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      });
  }, []);

  const handleUserSelect = (e) => {
    setUsername(e.target.value);
  };
  if (isLoading) {
    return <p> Loading.... </p>;
  }

  return (
    <div className="header">
      <h1>Welcome! Choose an existing username.</h1>

      {error && <p>{error}</p>}

      <select onChange={handleUserSelect} value={username}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>

      <Link to="/articles">
        <button className="text">Continue as {username}</button>
      </Link>
    </div>
  );
};
