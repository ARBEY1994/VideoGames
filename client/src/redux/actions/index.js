import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ID = "GET_ID";
export const CREATED_OR_EXISTING = "CREATED_OR_EXISTING";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const ORDER_ASC_DES = "ORDER_ASC_DES";

export function GetVideogames() {
  return async function (dispatch) {
    try {
      let info = await axios.get(`http://localhost:3001/videoGames`);
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetGenres() {
  return async function (dispatch) {
    try {
      let infoG = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: "GET_GENRES",
        payload: infoG.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      let { data } = await axios.get("http://localhost:3001/platforms");
      return dispatch({
        type: "GET_PLATFORMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetDetail(id) {
  return async function (dispatch) {
    try {
      let infoId = await axios.get(`http://localhost:3001/videoGames/${id}`);
      return dispatch({
        type: "GET_ID",
        payload: infoId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetByName(name) {
  return async function (dispatch) {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/videoGames?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_BY_NAME",
        payload: [],
      });
    }
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const info = await axios.post(`http://localhost:3001/videoGames`, payload);
    return info;
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function createdOrExisting(payload) {
  return {
    type: "CREATED_OR_EXISTING",
    payload,
  };
}

export function OrderAscOrDsc(payload) {
  return {
    type: "ORDER_ASC_DES",
    payload,
  };
}
