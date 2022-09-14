import Axios from "axios";

const axios = Axios.create();
axios.defaults.baseURL = "https://swapi.dev/api/";

export async function searchFilms(param) {
  try {
    const response = await axios.get("films/", { params: { search: param } });
    return addMovieIds(response.data.results, "movie");
  } catch (e) {
    console.log("Error fetching films:", e);
    return [];
  }
}

export async function searchPeople(param) {
  try {
    const response = await axios.get("people/", { params: { search: param } });
    return addMovieIds(response.data.results);
  } catch (e) {
    console.log("Error fetching people:", e);
    return [];
  }
}

export async function searchPlanets(param) {
  try {
    const response = await axios.get("planets/", { params: { search: param } });
    return addMovieIds(response.data.results);
  } catch (e) {
    console.log("Error fetching people:", e);
    return [];
  }
}

export async function getAllFilms() {
  try {
    const response = await axios.get("films/");
    return addMovieIds(response.data.results, "movie");
  } catch (e) {
    console.log("Error fetching all films:", e);
    return [];
  }
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
