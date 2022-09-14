import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchFilms, searchPeople, searchPlanets } from "../services/search";

const REDUCER_NAME = "star-wars/search";

export const fetchResults = createAsyncThunk(
  `${REDUCER_NAME}/fetchResults`,
  async (query) => {
    return await Promise.all([
      searchFilms(query),
      searchPeople(query),
      searchPlanets(query),
    ]);
  }
);

const searchSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    isError: false,
    films: [],
    planets: [],
    people: [],
    matchingFilms: [],
  },
  reducers: {
    setFilms: (state, action) => {
      state.matchingFilms = action.payload;
    },
    resetFilms: (state) => {
      state.false = false;
      state.matchingFilms = [];
    },
    setIsError: (state) => {
      state.isError = true;
    },
  },
  extraReducers: {
    [fetchResults.fulfilled]: (state, action) => {
      const [films, people, planets] = action.payload;
      state.false = false;
      state.films = films;
      state.people = people;
      state.planets = planets;
    },
    [fetchResults.rejected]: (state) => {
      state.isError = true;
    },
  },
});

export const { setFilms, resetFilms, setIsError } = searchSlice.actions;
export default searchSlice.reducer;
