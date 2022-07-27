import { useEffect, useRef, useState } from "react";
import "./App.css";
import ResultItem from "./components/resultItem/ResultItem";

function App() {
  const [searchValue, SetSearchValue] = useState("");
  const [searchResults, SetSearchResults] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [noArticles, setNoArticles] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue.trim() || loading) return;
    SetLoading(true);
    await fetch(
      `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        SetSearchResults(data.articles);
        if(data.articles.length === 0) setNoArticles(true)
      })
      .catch((err) => alert(err))
      .finally(()=>SetLoading(false))
  };

  useEffect(()=>{
    if(!searchValue?.trim()) setNoArticles(false);
  },[searchValue])


  return (
    <main className="bg-slate-100 flex items-center justify-center w-full h-screen">
      <div className="items-center justify-center flex flex-col h-full w-full py-12 px-4">
        {/* search */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="md:w-1/3 w-full mb-12 items-center justify-center flex flex-col space-y-12 "
        >
          <input
            type="text"
            className="w-full rounded-full py-3 px-6 bg-white shadow-md shadow-slate-200"
            placeholder="search for news ..."
            value={searchValue}
            onChange={(e) => SetSearchValue(e.target.value)}
          />
          <button disabled={!searchValue.trim()} className="search-btn">
            {loading ? "searching..." : "search"}
          </button>
        </form>
        {/* list */}
        {loading ? (
          <div className="w-full h-full items-center justify-center flex">
            <h1 className="w-full text-center text-lg"> loading... </h1>
          </div>
        ) : (
          <div className="px-12 overflow-y-auto items-start justify-start flex flex-col w-full">
            <div className="overflow-y-scroll items-start justify-start flex flex-col">
              {searchResults.map((result,i) => (
                <ResultItem data={result} key={result.source.id + i} />
                ))}
                </div>
              {noArticles && <h1 className="text-xl w-full text-center"> no articles available for {searchValue}</h1>}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
