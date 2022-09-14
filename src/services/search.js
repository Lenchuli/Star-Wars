import Axios from "axios";

const axios = Axios.create();
axios.defaults.baseURL = "https://swapi.dev/api/";

export async function searchFilms(param) {
  try {
    const response = await axios.get("films/", { params: { search: param } });
    return response.data.results;
  } catch (e) {
    console.log("Error ftching films:", e);
    return [];
  }
}
