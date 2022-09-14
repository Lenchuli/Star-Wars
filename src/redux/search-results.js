import { createSlice } from "@reduxjs/toolkit";
const REDUCER_NAME = "star-wars/search";

const searchSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    films: [],
  },
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload;
    },
  },
});

export const { setFilms } = searchSlice.actions;
export default searchSlice.reducer;
