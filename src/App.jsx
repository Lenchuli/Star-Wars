import { useState } from "react";
import flatten from "lodash/flatten";
import { searchFilms, searchPeople, searchPlanets } from "./services/search";
import "./App.css";

function App() {
  const [query, seQuery] = useState("");
  const [films, setFims] = useState([]);

  async function search() {
    const [movies, people, planets] = await Promise.all([
      searchFilms(query),
      searchPeople(query),
      searchPlanets(query),
    ]);
    const moviesByPeopleIds = flatten(
      people.map(({ films }) => {
        return films.map((item) => {
          const aux = item.split("/");
          return aux[aux.length - 2];
        });
      })
    );
    const moviesByPlanetsIds = flatten(
      planets.forEach(({ films }) =>
        films.map((item) => {
          const aux = item.split("/");
          return aux[aux.length - 2];
        })
      )
    );
    const moviesIds = movies.map(({ url }) => {
      const aux = url.split("/");
      return aux[aux.length - 2];
    });
    console.log(moviesByPeopleIds);
    console.log(moviesByPlanetsIds);
    console.log(moviesIds);
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
