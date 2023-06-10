import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createdOrExisting,
  filterByGenre,
  GetGenres,
  GetVideogames,
  OrderAscOrDsc,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import imag from "./styles/imagenes/videojuegos.jpg";
import "./styles/home.css";
import logo from "./styles/imagenes/logo.png";
import LoadingIcons from "react-loading-icons";
export default function Home() {
  const dispatch = useDispatch();

  const AllVideoGames = useSelector((state) => state.videoGames);
  const AllGenres = useSelector((state) => state.genres);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [videoGamesByPage, setVideoGameByPage] = useState(15);
  const [order, setOrder] = useState("");
  const lastIndex = pageCurrent * videoGamesByPage;
  const firstIndex = lastIndex - videoGamesByPage;
  const currentPage = AllVideoGames.slice(firstIndex, lastIndex);
  const paginado = (pageNumber) => {
    setPageCurrent(pageNumber);
  };

  useEffect(() => {
    dispatch(GetVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetGenres());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(GetVideogames());
    window.location.reload();
  };

  const handleFilterGenre = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
  };

  const handleSelectCreated = (e) => {
    e.preventDefault();
    dispatch(createdOrExisting(e.target.value));
  };
  const handleSelectOrder = (e) => {
    e.preventDefault();
    dispatch(OrderAscOrDsc(e.target.value));
    setPageCurrent(1);
    setOrder(e.target.value);
  };

  return (
    <div className="fondo">
      <SearchBar />

      <div className="ubicacioncreate">
        <Link to="/Create">
          <button className="createvideo">New Video Game</button>
        </Link>
      </div>
      <div className="title">
        <span>Your best video games here</span>
      </div>
      <div>
        <main>
          <button className="buttonLoad" onClick={(e) => handleClick(e)}>
            {" "}
            Load again
          </button>
        </main>
      </div>
      <div>
        <div className="select">
          <select
            className="efectselect"
            onChange={(e) => handleFilterGenre(e)}
          >
            <option value="all">Genres</option>
            {AllGenres?.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <select
            className="efectselect1"
            onChange={(e) => handleSelectCreated(e)}
          >
            <option value="all">Source</option>
            <option value="api">Existing</option>
            <option value="db">Created</option>
          </select>
          <select
            className="efectselect2"
            onChange={(e) => handleSelectOrder(e)}
          >
            <option>Ascending and descending order</option>
            <option value="asc">Ascending alphabet</option>
            <option value="des">Descending alphabet</option>
            <option value="rat+"> + Rating</option>
            <option value="rat-"> - Rating</option>
          </select>
        </div>

        <div>
          <h1>{""} </h1>
        </div>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <h4>{""} </h4>
        </div>
        <div className="homeCard">
          {currentPage.length > 0 ? (
            currentPage?.map((e) => {
              return (
                <div key={e.id}>
                  <Card
                    id={e.id}
                    name={e.name}
                    background_image={
                      e.background_image ? e.background_image : imag
                    }
                    genres={e.genres.name ? e.genres.name : e.genres}
                  />
                </div>
              );
            })
          ) : (
            <div className="imagenl">
              <LoadingIcons.Bars />
            </div>
          )}
        </div>
        <div>
          <Paginado
            videoGamesByPage={videoGamesByPage}
            AllVideoGames={AllVideoGames.length}
            paginado={paginado}
          />
        </div>
      </div>
    </div>
  );
}
