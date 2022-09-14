import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Search } from "./components/Search";
import { Detail } from "./components/Detail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="search" element={<Search />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to="/search" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
