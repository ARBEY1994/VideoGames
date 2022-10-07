import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_BY_NAME,
  GET_ID,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  CREATED_OR_EXISTING,
  ORDER_ASC_DES,
} from "../actions";

const initialState = {
  videoGames: [],
  platforms: [],
  getId: [],
  modificVideogames: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
        modificVideogames: action.payload,
      };
    case GET_GENRES:
      let act = action.payload;
      let arrayGenres = [];
      act.forEach((e) => arrayGenres.push(e.name));

      return {
        ...state,
        genres: arrayGenres,
      };

    case GET_BY_NAME:
      return {
        ...state,
        videoGames: action.payload,
      };

    case GET_ID:
      return {
        ...state,
        getId: action.payload,
      };
    case "POST_VIDEOGAMES":
      return {
        ...state,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case FILTER_BY_GENRE:
      let info = state.modificVideogames;
      let data =
        action.payload === "all"
          ? info
          : info.filter((e) =>
              e.genres
                .map((e) => (e.name ? e.name : e))
                .includes(action.payload)
            );
      return {
        ...state,
        videoGames: data,
      };

    case CREATED_OR_EXISTING:
      let infoCreate = state.modificVideogames;
      let dataCreate =
        action.payload === "db"
          ? infoCreate.filter((e) => e.createInDb)
          : infoCreate.filter((e) => !e.createInDb);
      return {
        ...state,
        videoGames: action.payload === "all" ? infoCreate : dataCreate,
      };

    case ORDER_ASC_DES:
      let order = state.modificVideogames;

      if (action.payload === "asc") {
        order.sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      if (action.payload === "des") {
        order.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      if (action.payload === "rat+") {
        order.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      }
      if (action.payload === "rat-") {
        order.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      }

      return {
        ...state,
        videoGames: order,
      };

    default:
      return state;
  }
}

export default rootReducer;
