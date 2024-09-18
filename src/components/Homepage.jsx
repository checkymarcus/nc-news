import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="header">
      <Link to="/articles">
        <h1 className="text">Articles</h1>
      </Link>
    </div>
  );
};
