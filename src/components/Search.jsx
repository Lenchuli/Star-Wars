import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilms,
  resetFilms,
  fetchResults,
  setIsError,
  setQuery,
} from "../redux/search-results";
import { useSearchParams } from "react-router-dom";
import flatten from "lodash/flatten";
import { getAllFilms } from "../services/search";
import { Placard } from "./Placard";
import styles from "./Search.module.scss";

export function Search() {
  const dispatch = useDispatch();
  const { films, planets, people, matchingFilms, isError, isLoading } =
    useSelector((state) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, seQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    (async () => {
      try {
        const filmsIds = [];
        const peopleIds = [];
        const planetsIds = [];
        films.forEach(({ movieId }) => {
          filmsIds.push(movieId);
        });
        people.forEach(({ movieIds }) => {
          peopleIds.push(movieIds);
        });
        planets.forEach(({ movieIds }) => {
          planetsIds.push(movieIds);
        });
        const totalIds = [
          ...filmsIds,
          ...flatten(peopleIds),
          ...flatten(planetsIds),
        ];
        const uniqueIds = [];
        totalIds.forEach((id) => {
          if (!uniqueIds.includes(id)) {
            uniqueIds.push(id);
          }
        });
        if (uniqueIds.length > filmsIds.length) {
          let allMovies = await getAllFilms();
          const myMovies = allMovies.filter(({ movieId }) =>
            uniqueIds.includes(movieId)
          );
          dispatch(setFilms(myMovies));
        } else {
          dispatch(setFilms(films));
        }
      } catch (e) {
        dispatch(setIsError());
      }
    })();
  }, [films, planets, people]);

  async function search() {
    dispatch(setQuery(query));
    if (!query) {
      dispatch(resetFilms());
    } else {
      dispatch(fetchResults(query));
    }
  }

  function handleChange(str) {
    seQuery(str);
    if (str) {
      setSearchParams({ query: str });
    } else {
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  }

  return (
    <div className={styles.container}>
      {isError ? (
        <header className={styles.header}>Ooops! An error occurred</header>
      ) : (
        <>
          <header className={styles.header}>Star Wars archives</header>
          <div className={styles.description}>
            Search films by: title, character or planet
          </div>
          <div className={styles.searcher}>
            <input
              type="text"
              value={query}
              onChange={(event) => handleChange(event.target.value)}
            />
            <button onClick={search}>GO</button>
          </div>
          {isLoading ? (
            <div className={styles.description}>Loading...</div>
          ) : (
            <div className={styles.results}>
              {matchingFilms.map(
                ({ title, movieId, episode_id, release_date }) => (
                  <Placard
                    key={movieId}
                    movieId={movieId}
                    title={title}
                    episode={episode_id}
                    releaseDate={release_date}
                  />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
