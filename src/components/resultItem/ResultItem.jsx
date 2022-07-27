import React from "react";

function ResultItem({ data }) {
  const { title, author } = data;
  return (
    <div className="w-full border my-3 px-3 py-3 border-black items-center justify-center flex flex-col">
      <h1> {title} </h1>
      <h1> {author} </h1>
    </div>
  );
}

export default ResultItem;
