import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilms, resetFilms } from "../redux/search-results";
import flatten from "lodash/flatten";
import {
  searchFilms,
  searchPeople,
  searchPlanets,
  getAllFilms,
} from "../services/search";
import { Placard } from "./Placard";
import styles from "./Search.module.scss";

export function Search() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.search.films);
  const [query, seQuery] = useState("");

  async function search() {
    if (!query) {
      dispatch(resetFilms());
    } else {
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
        dispatch(setFilms(myMovies));
      } else {
        dispatch(setFilms(movies));
      }
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>Star Wars archives</header>
      <div className={styles.description}>
        Search films by: title, character or planet
      </div>
      <div className={styles.searcher}>
        <input
          type="text"
          value={query}
          onChange={(event) => seQuery(event.target.value)}
        />
        <button onClick={search}>GO</button>
      </div>
      <div className={styles.results}>
        {films.map(({ title, movieId, episode_id, release_date }) => (
          <Placard
            key={movieId}
            movieId={movieId}
            title={title}
            episode={episode_id}
            releaseDate={release_date}
          />
        ))}
      </div>
    </div>
  );
}
