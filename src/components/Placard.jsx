import { Link } from "react-router-dom";
import styles from "./Placard.module.scss";

export function Placard({ movieId, title, episode, releaseDate }) {
  function getYearsAgo(str) {
    const date = new Date(str);
    const now = new Date();
    return now.getYear() - date.getYear();
  }

  return (
    <div className={styles.placard}>
      <Link to={`/detail/${movieId}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.episode}>Episode: {episode}</div>
        <div className={styles.date}>
          {releaseDate} {getYearsAgo(releaseDate)} {"years ago"}
        </div>
      </Link>
    </div>
  );
}
