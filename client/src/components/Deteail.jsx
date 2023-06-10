import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GetDetail } from "../redux/actions";
import imag from "./styles/imagenes/videojuegos.jpg";

import "./styles/detail.css";

export default function VideoGameDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const IdGame = useSelector((state) => state.getId);
  const [state, setState] = useState(true);

  useEffect(() => {
    dispatch(GetDetail(id)).then(() => setState(false));
  }, [dispatch, id]);

  if (state) {
    return (
      <div>
        {" "}
        <img src="" alt="" />
      </div>
    );
  }

  let expressions = /(<([^>]+)>)/gi;

  return (
    <div className="detail">
      <div>
        {
          <div className="fondo2">
            <div className="imagend">
              <img
                src={IdGame.background_image ? IdGame.background_image : imag}
                alt="img not fount"
                height="100px"
                width="100px"
              />
            </div>
            <div className="text">
              <h3>Id: {IdGame.id}</h3>
              <h3>Name: {IdGame.name}</h3>

              <h3>Released: {IdGame.released}</h3>
              <h3>Rating: {IdGame.rating} </h3>
              <h3>
                Platforms:{" "}
                {IdGame.platforms.map((e) => (e.name ? "," + e.name : "," + e))}
              </h3>
              <h3>
                Genres:{" "}
                {IdGame.genres.map((e) => (e.name ? "," + e.name : "," + e))}
              </h3>
              <h3>
                Description:{" "}
                {IdGame.description
                  .replace(expressions, "")
                  .replace("&#39", "")}
              </h3>
            </div>
          </div>
        }
      </div>
      <div>
        <h1>{}</h1>
        <h2>{}</h2>
        <Link to="/Home">
          <button className="botondetail">Home</button>
        </Link>
      </div>
    </div>
  );
}
