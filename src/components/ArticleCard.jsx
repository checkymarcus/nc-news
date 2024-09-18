export const ArticleCard = ({ image, title, author, topic, date }) => {
  return (
    <div className="articlecard">
      <img className="image" src={image} alt={title} />
      <div className="article-info">
        <p className="name">{title}</p>
        <p className="author">By {author}</p>
        <p className="topic">Topic: {topic}</p>
        <p className="date">{new Date(date).toDateString()}</p>
      </div>
    </div>
  );
};
