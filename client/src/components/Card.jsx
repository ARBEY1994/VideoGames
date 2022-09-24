import React from "react";
import { Link } from "react-router-dom";
import "./styles/card.css";

export default function Card({ id, name, background_image, genres }) {
  return (
    <div className="card">
      <div>
        <Link to={`/Home/${id}`}>
          <img
            src={background_image}
            alt="imagen not fount"
            width="200px"
            height="200px"
          />
        </Link>
      </div>
      <div className="content">
        <h3>Game: {name}</h3>

        <h3>Genres: {genres.map((e) => (e.name ? " " + e.name : " " + e))}</h3>
      </div>
    </div>
  );
}
