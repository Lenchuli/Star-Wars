import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getFilmById, searchPeople, searchPlanets } from "../services/search";
import styles from "./Detail.module.scss";

export function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useSelector((state) => state.search.query);
  const [film, setFilm] = useState({});
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleQuery, setPeopleQuery] = useState(-1);
  const [planetsQuery, setPlanetsQuery] = useState(-1);

  useEffect(() => {
    (async () => {
      try {
        const [myFilm, people, planets] = await Promise.all([
          getFilmById(id),
          searchPeople(),
          searchPlanets(),
        ]);
        setFilm(myFilm);
        const filteredPeople = people.filter(({ movieIds }) =>
          movieIds.find((id) => id === myFilm.id)
        );
        const filteredPlanets = planets.filter(({ movieIds }) =>
          movieIds.find((id) => id === myFilm.id)
        );
        setCharacters(filteredPeople);
        setPlanets(filteredPlanets);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (query && (characters.length > 0 || planets.length > 0)) {
      setPeopleQuery(
        characters.findIndex(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setPlanetsQuery(
        planets.findIndex(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, characters, planets]);

  return (
    <div className={styles.container}>
      {isError ? (
        <header className={styles.header}>Ooops! An error occurred</header>
      ) : (
        <>
          <button className={styles.back} onClick={() => navigate("/search")}>
            Back to results
          </button>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <header className={styles.header}>
                {film.title}{" "}
                <span className={styles.subheader}>
                  Episode {film.episode_id}
                </span>
              </header>
              <div className={styles.card}>
                <div className={styles.staff}>
                  <span className={styles.director}>
                    Director: {film.director}
                  </span>
                  <span className={styles.producer}>
                    Producer: {film.producer}
                  </span>
                </div>
                <div className={styles.date}>{film.release_date}</div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>Characters:</div>
                  {characters.map(({ name }, index) => (
                    <span
                      className={index === peopleQuery ? styles.query : ""}
                      key={index}
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>Planets:</div>
                  {planets.map(({ name }, index) => (
                    <span
                      className={index === planetsQuery ? styles.query : ""}
                      key={index}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
