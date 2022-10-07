import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetByName } from "../redux/actions";
import "./styles/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      dispatch(GetByName(name));
      setName("");
    } else {
      alert("please write something");
    }
  };
  return (
    <div className="allSearch">
      <input
        type="text"
        id="name"
        value={name}
        autoComplete="off"
        placeholder="Search..."
        onChange={(e) => handleInput(e)}
      />
      <button className="search" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
