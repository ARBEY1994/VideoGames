const { Router } = require("express");
const videogamesRoute = require("./videogames");
const genresRoute = require("./genres");
const platformsRoute = require("./platforms");

const router = Router();

router.use("/videoGames", videogamesRoute);
router.use("/genres", genresRoute);
router.use("/platforms", platformsRoute);

module.exports = router;
