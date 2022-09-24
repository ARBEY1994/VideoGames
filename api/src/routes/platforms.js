const { Router } = require("express");
const { getAllInfo } = require("../controller/funtions");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let info = await getAllInfo();
    let arrayInfo = [];
    info.map((p) =>
      p.platforms.map((e) => {
        if (!arrayInfo.includes(e)) {
          arrayInfo.push(e);
        }
      })
    );

    res.status(200).send(arrayInfo);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
