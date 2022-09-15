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
    isLoading: false,
    films: [],
    planets: [],
    people: [],
    matchingFilms: [],
    query: "",
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
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [fetchResults.fulfilled]: (state, action) => {
      const [films, people, planets] = action.payload;
      state.false = false;
      state.isLoading = false;
      state.films = films;
      state.people = people;
      state.planets = planets;
    },
    [fetchResults.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [fetchResults.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setFilms, resetFilms, setIsError, setQuery } =
  searchSlice.actions;
export default searchSlice.reducer;
