import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFilmById } from "../services/search";

export function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [film, setFilm] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getFilmById(id);
        setFilm(response);
      } catch (e) {}
    })();
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate("/search")}>Back to results</button>
      <div>{film.title}</div>
    </div>
  );
}
