import { getTopics } from "../../apiCalls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then((response) => {
        const allTopics = response.data.topics;
        setTopics(allTopics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
        setLoading(false);
      });
  }, []);

  const topicChange = (e) => {
    const selectedTopic = e.target.value;
    navigate(`/articles/?topic=${selectedTopic}`);
    console.log("Navigating to topic: " + selectedTopic);
  };

  if (loading) return <p>Loading topics...</p>;

  return (
    <div>
      <label htmlFor="topics">Choose a topic</label>
      <select id="topics" onChange={topicChange}>
        <option key="all" value="All">
          All
        </option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
    </div>
  );
};
