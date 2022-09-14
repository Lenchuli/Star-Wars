import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Search } from "./components/Search";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/search" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
