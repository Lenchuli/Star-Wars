import { Link } from "react-router-dom";
import styles from "./Placard.module.scss";

export function Placard({ title, movieId }) {
  return (
    <div className={styles.placard}>
      <Link to={`/detail/${movieId}`}>{title}</Link>
    </div>
  );
}
