import Axios from "axios";

const axios = Axios.create();
axios.defaults.baseURL = "https://swapi.dev/api/";

export async function searchFilms(param) {
  try {
    const response = await axios.get("films/", { params: { search: param } });
    return response.data.results;
  } catch (e) {
    console.log("Error fetching films:", e);
    return [];
  }
}

export async function searchPeople(param) {
  try {
    const response = await axios.get("people/", { params: { search: param } });
    return response.data.results;
  } catch (e) {
    console.log("Error fetching people:", e);
    return [];
  }
}

export async function searchPlanets(param) {
  try {
    const response = await axios.get("planets/", { params: { search: param } });
    return response.data.results;
  } catch (e) {
    console.log("Error fetching people:", e);
    return [];
  }
}
