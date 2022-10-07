const axios = require("axios");
require("dotenv").config();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;

const getApi = async () => {
  try {
    let videogamesInfo = [];
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    for (var i = 0; i < 5; i++) {
      let infoApi = await axios.get(url);
      infoApi.data.results.map((e) => {
        videogamesInfo.push({
          id: e.id,
          name: e.name,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          background_image: e.background_image,
          genres: e.genres.map((e) => e.name),
        });
      });
      url = infoApi.data.next;
    }

    return videogamesInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDb = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllInfo = async () => {
  let infoApi = await getApi();
  let infoDb = await getDb();

  let AllInfo = infoApi.concat(infoDb);
  return AllInfo;
};

const getSearhName = async (name) => {
  let infoSearc = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );

  let arrayIn = [];
  await infoSearc.data.results.map((e) => {
    arrayIn.push({
      id: e.id,
      name: e.name,
      background_image: e.background_image,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => e.name),
    });
  });
  return arrayIn;
};

const getIDApi = async (id) => {
  try {
    let infoId = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    if (infoId) {
      const elId = infoId.data;
      const info = {
        id: elId.id,
        name: elId.name,
        background_image: elId.background_image,
        released: elId.released,
        rating: elId.rating,
        description: elId.description,
        platforms: elId.platforms.map((e) => e.platform.name),
        genres: elId.genres.map((e) => e.name),
      };
      return info;
    } else {
      return alert("id no fount");
    }
  } catch (error) {
    console.log(error);
  }
};

const getIdDb = async (id) => {
  try {
    return await Videogame.findByPk(id, {
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getId = async (id) => {
  const DataBase = id.includes("-");

  if (DataBase) {
    const idDb = await getIdDb(id);
    return idDb;
  } else {
    const idApi = await getIDApi(id);
    return idApi;
  }
};

module.exports = {
  getApi,
  getDb,
  getIDApi,
  getIdDb,
  getSearhName,
  getId,
  getAllInfo,
};
