import { useState } from "react";
import "./App.css";
import ResultItem from './components/resultItem/ResultItem';

function App() {
  const [searchValue, SetSearchValue] = useState("");
  const [searchResults, SetSearchResults] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=54155f4f3af745a48fd08bd790f5a0c9`
    )
      .then((res) => res.json())
      .then((data) => {
        SetSearchResults(data);
      })
      .catch((err) => alert(err));
  };
  return (
    <main className="bg-slate-100 flex items-center justify-center w-full h-screen">
      <div className="items-center justify-center flex flex-col h-full w-full py-3 px-4">
        {/* search */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="md:w-1/3 w-full items-center justify-center flex flex-col space-y-12 "
        >
          <input
            type="text"
            className="w-full rounded-full py-3 px-6 bg-white shadow-md shadow-slate-200"
            placeholder="search for news ..."
            value={searchValue}
            onChange={(e) => SetSearchValue(e.target.value)}
          />
          <button disabled={!searchValue.trim()} className="search-btn">
            search
          </button>
        </form>
        {/* list */}
        <div>
          {searchResults.map(result => (
            <ResultItem data={result} key={result.source.id}  />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
