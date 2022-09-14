import React from "react";
import { Search } from "./Search";
import { Placard } from "./Placard";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

jest.mock("./Placard");
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

beforeEach(() => {
  Placard.mockImplementation(() => <></>);
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    films: [],
    planets: [],
    people: [],
    matchingFilms: [],
    isError: false,
    isLoading: false,
  });
  useSearchParams.mockReturnValue(
    [{ query: "123", get: jest.fn() }],
    jest.fn()
  );
});

test("Should render component", async () => {
  const { container } = render(<Search />);
  await waitFor(() => container);
  expect(container).toBeDefined();
});
