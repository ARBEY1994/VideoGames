const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Genres } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let info = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let infoN = await info.data.results.map((e) => e.name);

    await infoN.forEach((e) => {
      Genres.findOrCreate({
        where: { name: e },
      });
    });
    let AllGenres = await Genres.findAll();

    res.status(200).send(AllGenres);
  } catch (error) {
    console.log(error);
  }
});
// hola

module.exports = router;
