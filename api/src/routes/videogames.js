const { Router } = require("express");

const {
  getId,
  getAllInfo,
  getSearhName,
  getDb,
} = require("../controller/funtions");
const { Videogame, Genres } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    let AllInfo = await getAllInfo();

    if (name) {
      let infoS = await getSearhName(name);
      let infoDb = await getDb();

      let nameDb = infoDb.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      let searchName = nameDb.concat(infoS);
      searchName.length
        ? res.status(200).send(searchName.slice(0, 15))
        : res.status(400).send("videogame not found!");
    } else {
      res.status(200).send(AllInfo);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let infoId = await getId(id);
    infoId
      ? res.status(200).send(infoId)
      : res.status(400).send("id not found!");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    createInDb,
    genres,
  } = req.body;
  try {
    let videoGneW = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
      createInDb,
    });

    let genresM = await Genres.findAll({
      where: { name: genres },
    });
    videoGneW.addGenres(genresM);
    res.status(200).send("¡video game successfully created!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
