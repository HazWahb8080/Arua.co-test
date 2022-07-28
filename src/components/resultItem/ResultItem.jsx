import React from "react";

function ResultItem({ data }) {
  const { title, author, urlToImage } = data;
  return (
    <div className=" result-item-wrapper">
      <div className="text-wrapper">
        <h1 className="result-title"> {title} </h1>
        <h1 className="result-author"> {author} </h1>
      </div>
      <img
        src={urlToImage}
        alt={title}
        className="result-image"
      />
    </div>
  );
}

export default ResultItem;
