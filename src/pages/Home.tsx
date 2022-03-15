import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <section className="home" data-testid="home">
      <h1 className="title">Canvas 2D Demonstrations</h1>
      <p className="description">
        Below you will find links to different mathematical applications in
        canvas 2D.
      </p>

      <div className="home-links">
        <Link to="/raycast">Raycasting</Link>
        <Link to="/randomwalk">Random Walk</Link>
        <Link to="/steer">Steering Vehicle</Link>
      </div>
    </section>
  );
};

export default Home;
