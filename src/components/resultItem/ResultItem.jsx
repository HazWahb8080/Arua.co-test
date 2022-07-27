import React from "react";

function ResultItem({ data }) {
  const { title, author, urlToImage } = data;
  return (
    <div className="w-full border my-3 px-3 py-3 border-black/20 hover:shadow-md hover:shadow-slate-300 duration-300 ease-in-out transition items-start justify-between flex">
      <div className="w-full items-start justify-start flex flex-col py-12 px-5 space-y-6 ">
        <h1 className="text-3xl text-gray-800"> {title} </h1>
        <h1 className="text-xl text-gray-800 font-medium "> {author} </h1>
      </div>
      <img
        src={urlToImage}
        alt={title}
        className="w-[400px] object-center object-cover"
      />
    </div>
  );
}

export default ResultItem;
