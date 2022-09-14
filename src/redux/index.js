import { configureStore } from "@reduxjs/toolkit";
import search from "./search-results";

export const store = configureStore({ reducer: { search } });
