import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetGenres, getPlatforms, postVideogame } from "../redux/actions";
import "./styles/create.css";
import logo from "./styles/imagenes/logo.png";

const validate = (input) => {
  let error = {};
  if (!input.name || typeof input.name !== "string") {
    error.name = "please type a name!";
  }
  if (
    !input.description ||
    typeof input.description !== "string" ||
    input.description.charAt(100)
  ) {
    error.description =
      "please write a description that is less than 100 characters!";
  }
  if (!input.released || typeof input.released !== "string") {
    error.released = "please write a date!";
  }
  if (!input.rating || input.rating > 10 || input.rating < 0) {
    error.rating = "please enter a numeric value valid";
  }
  if (!input.platforms) {
    error.platforms = "please select at least one platform";
  }
  if (!input.genres) {
    error.genres = "please select a gender";
  }

  return error;
};
export default function VideogameCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Genres = useSelector((state) => state.genres);
  const Platforms = useSelector((state) => state.platforms);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",

    rating: "",
    platforms: [],
    background_image: "",
    genres: [],
  });

  useEffect(() => {
    dispatch(GetGenres());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      return alert("please enter a name!");
    } else if (!input.description || input.description.charAt(100)) {
      return alert("please enter a valid description!");
    } else if (!input.released) {
      return alert("please enter release date!");
    } else if (!input.rating || input.rating < 0 || input.rating > 10) {
      return alert("please enter a valid rating!");
    } else if (!input.platforms) {
      return alert("please select a platform!");
    } else if (!input.genres) {
      return alert("seleccione un genero");
    } else {
      dispatch(postVideogame(input));
      alert("videoGame created successfully!!");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",

        platforms: [],
        background_image: "",
        genres: [],
      });
    }
    navigate("/Home");
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSelectGenres = (e) => {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    } else {
      alert("please select other genre");
    }
  };
  const handleSelectPlatforms = (e) => {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    } else {
      alert("please select other platform");
    }
  };
  const handleDeleteGenres = (el) => {
    setInput({
      ...input,
      genres: input.genres.filter((e) => e !== el),
    });
  };
  const handleDeletePlatforms = (el) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((e) => e !== el),
    });
  };
  return (
    <div className="fondoCreate">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="homecre">
        <Link to="/Home">
          <button className="botonhomecre">Home</button>
        </Link>
      </div>
      <div className="titlecreate">
        <span>N e w &#160;V i d e o &#160;G a m e</span>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputc">
          <strong>
            <label>Name: </label>
          </strong>
          <input
            type="text"
            autoComplete="off"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error.name && <span>{error.name}</span>}
        </div>
        <div className="inputc">
          <strong>
            <label>Description: </label>
          </strong>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {error.description && <span> {error.description}</span>}
        </div>

        <div className="inputc">
          <strong>
            <label>Rating: </label>
          </strong>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {error.rating && <span>{error.rating}</span>}
        </div>
        <div className="inputc">
          <strong>
            <label>Released: </label>
          </strong>
          <input
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {error.released && <span> {error.released}</span>}
        </div>
        <div className="inputc">
          <strong>
            <label>Imagen: </label>
          </strong>
          <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
          {error.background_image && <pan>{error.background_image}</pan>}
        </div>
        <div className="inputc">
          <strong>Platforms: </strong>
          <select onChange={(e) => handleSelectPlatforms(e)}>
            {Platforms.map((e) => (
              <option className="option" key={e}>
                {e}
              </option>
            ))}
            {error.platforms && <span>{error.platforms}</span>}
          </select>
          <ul>
            <li className="li">
              {input.platforms.map((e) => (
                <div>
                  <h5>
                    {Platforms?.find((p) => p === e)}
                    <button onClick={() => handleDeletePlatforms(e)}>X</button>
                  </h5>
                </div>
              ))}
            </li>
          </ul>
        </div>
        <div className="inputc">
          <strong>Genres: </strong>
          <select onChange={(e) => handleSelectGenres(e)}>
            {Genres.map((e) => (
              <option className="option" key={e}>
                {e}
              </option>
            ))}
            {error.genres && <span>{error.genres}</span>}
          </select>
          <ul>
            <li className="li">
              {input.genres.map((e) => (
                <div>
                  <h5>
                    {Genres?.find((p) => p === e)}
                    <button onClick={() => handleDeleteGenres(e)}>X</button>
                  </h5>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </form>
      <div className="moveocretae">
        <button
          className="botoncreate"
          id="submit"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create Videogame
        </button>
      </div>
    </div>
  );
}
