import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Player from "./Pages/Player";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/player/:videoId" element={<Player/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
