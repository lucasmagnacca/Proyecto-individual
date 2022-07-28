const axios = require("axios");
require("dotenv").config();
const { Genre } = require("../../db.js");
const { API_KEY } = process.env;

async function getGenres() {
  const genresInApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}&ordering=id`
  );
  const apiData = genresInApi.data.results;
  apiData.forEach((element) => {
    Genre.findOrCreate({
      where: { name: element.name, id: element.id },
    });
    
  });
  return "ok";
}
module.exports = getGenres;
