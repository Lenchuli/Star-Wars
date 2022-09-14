import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFilmById } from "../services/search";
import styles from "./Detail.module.scss";

export function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getFilmById(id);
        setFilm(response);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, [id]);

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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
