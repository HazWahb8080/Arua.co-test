import { useEffect, useState } from "react";
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
        if (data.articles.length === 0) setNoArticles(true);
      })
      .catch((err) => alert(err))
      .finally(() => SetLoading(false));
  };

  useEffect(() => {
    if (!searchValue?.trim()) setNoArticles(false);
  }, [searchValue]);

  return (
    <main className="main-container">
      <div className="wrapper">
        {/* search */}
        <form onSubmit={(e) => handleSubmit(e)} className="form-wrapper">
          <input
            type="text"
            className="search-input"
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
          <div className="loading-wrapper">
            <h1 className="loading-text"> loading... </h1>
          </div>
        ) : (
          <div className="body-container">
            <div className="results-wrapper">
              {searchResults.map((result, i) => (
                <ResultItem data={result} key={result.source.id + i} />
              ))}
            </div>
            {noArticles && (
              <h1 className="noArticles-text">
                no articles available for {searchValue}
              </h1>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
