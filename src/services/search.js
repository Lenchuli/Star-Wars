import Axios from "axios";

const axios = Axios.create({ timeout: 7000 });
axios.defaults.baseURL = "https://swapi.dev/api/";

export async function searchFilms(param) {
  const response = await axios.get("films/", { params: { search: param } });
  return addMovieIds(response.data.results, "movie");
}

export async function searchPeople(param) {
  const response = await axios.get("people/", { params: { search: param } });
  return addMovieIds(response.data.results);
}

export async function searchPlanets(param) {
  const response = await axios.get("planets/", { params: { search: param } });
  return addMovieIds(response.data.results);
}

export async function getAllFilms() {
  const response = await axios.get("films/");
  return addMovieIds(response.data.results, "movie");
}

export async function getFilmById(id) {
  const response = await axios.get(`films/${id}`);
  return { ...response.data, id };
}

function addMovieIds(arr, type) {
  if (type === "movie") {
    return arr.map((item) => ({
      ...item,
      movieId: item.url
        .replace(`${axios.defaults.baseURL}films/`, "")
        .replace("/", ""),
    }));
  } else {
    return arr.map((item) => ({
      ...item,
      movieIds: item.films.map((url) =>
        url.replace(`${axios.defaults.baseURL}films/`, "").replace("/", "")
      ),
    }));
  }
}
