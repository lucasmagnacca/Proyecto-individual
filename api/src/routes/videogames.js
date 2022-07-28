const { Router } = require("express");
const getInfoApi = require("../utils/funtion/getApi");
const getMyData = require("../utils/funtion/getMydata");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.get("/", async (req, res, next) => {
  let instanceApi;
  let instanceMine;
  let name = req.query.name;
  let page = req.query.page;
  if (!page) {
    page = 1;
  }
  try {
    if (name) {
      instanceApi = await getInfoApi(name);
      instanceMine = await getMyData(name);
    } else {
      instanceApi = await getInfoApi();
      instanceMine = await getMyData();
    }
    Promise.all([instanceApi, instanceMine]).then((x) => {
      const [instanceApi, instanceMine] = x;
      let filterCharacters = instanceApi.map((x) => {
        return {
          id: x.id, //uuidv4()
          name: x.name,
          released: x.released,
          image: x.background_image,
          rating: x.rating,
          description: x.slug,
          // Ingenioso esto no?
          genres: x.genres.map((z) => z),
          platforms: x.platforms.map((z) => z)
        };
      });

      let allVideogames = [...instanceMine, ...filterCharacters];
      if (allVideogames.length === 0) {
        let obj = {
          id: uuidv4(),
          name: "Not Found",
          released: "00-00-0000",
          image:
            "https://pandagila.com/wp-content/uploads/2020/08/error-404-not-found.jpg",
          rating: 0,
          description: "The game has 0 results",
          genres: [],
          platforms: [],
        };
        console.log("4");
        return res.send([obj]).status(404);
      }

      res.send(allVideogames);
    });
  } catch (e) {
    console.log("error");
    next(e);
  }
});

module.exports = router;
