import { useState } from "react";
import { searchFilms } from "./services/search";
import "./App.css";

function App() {
  const [query, seQuery] = useState("");
  const [films, setFims] = useState([]);

  async function search() {
    const results = await searchFilms(query);
    setFims(results);
  }

  return (
    <div className="App">
      <header className="App-header">Search films</header>
      <div>
        <input
          type="text"
          value={query}
          onChange={(event) => seQuery(event.target.value)}
        />
        <button onClick={search}>GO</button>
      </div>
      <div>
        {films.map(({ title }) => (
          <div>{title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
