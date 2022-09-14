import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFilmById } from "../services/search";

export function Detail() {
  const { id } = useParams();
  const [film, setFim] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getFilmById(id);
        setFim(response);
      } catch (e) {}
    })();
  }, [id]);

  return <div>{film.title}</div>;
}
