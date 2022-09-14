import { useState } from "react";
import flatten from "lodash/flatten";
import {
  searchFilms,
  searchPeople,
  searchPlanets,
  getAllFilms,
} from "../services/search";

export function Search() {
  const [query, seQuery] = useState("");
  const [films, setFims] = useState([]);

  async function search() {
    const [movies, people, planets] = await Promise.all([
      searchFilms(query),
      searchPeople(query),
      searchPlanets(query),
    ]);
    const moviesIds = [];
    const peopleIds = [];
    const planetsIds = [];
    movies.forEach(({ movieId }) => {
      moviesIds.push(movieId);
    });
    people.forEach(({ movieIds }) => {
      peopleIds.push(movieIds);
    });
    planets.forEach(({ movieIds }) => {
      planetsIds.push(movieIds);
    });
    const totalIds = [
      ...moviesIds,
      ...flatten(peopleIds),
      ...flatten(planetsIds),
    ];
    const uniqueIds = [];
    totalIds.forEach((id) => {
      if (!uniqueIds.includes(id)) {
        uniqueIds.push(id);
      }
    });
    if (uniqueIds.length > moviesIds.length) {
      let allMovies = await getAllFilms();
      const myMovies = allMovies.filter(({ movieId }) =>
        uniqueIds.includes(movieId)
      );
      setFims(myMovies);
    } else {
      setFims(movies);
    }
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
        {films.map(({ title, movieId }) => (
          <div key={movieId}>{title}</div>
        ))}
      </div>
    </div>
  );
}
