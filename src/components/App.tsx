import React from "react";
import RaycastCanvas from "../components/RaycastCanvas/RaycastCanvas";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RandomWalkCanvas from "./RandomWalkCanvas/RandomWalkCanvas";
import SteerCanvas from "./SteerCanvas/SteerCanvas";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/raycast"
          element={<RaycastCanvas width={1600} height={800} />}
        />
        <Route
          path="/randomwalk"
          element={<RandomWalkCanvas width={1600} height={800} />}
        />
        <Route
          path="/steer"
          element={<SteerCanvas width={1600} height={800} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
