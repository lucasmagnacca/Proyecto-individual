
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;


async function getInfoApi(name) {
  let page1 = [];
  let page2 = [];
  let page3 = [];
  if (!name) {
    page1 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
    );
    let uri = page1.data.next;
    page1 = [...page1.data.results];
    page2 = await axios.get(uri);
    uri = page2.data.next;
    page2 = [...page2.data.results];
    page3 = await axios.get(uri);
    page3 = [...page3.data.results];
    return[...page1,...page2,...page3];
  } else {
    page1 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`
    );

    return [...page1.data.results];
  }
}

/* const getInfoApi= async () => {
  const page1= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
  const page2= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
  const page3= await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`);
  let apis= page1.data.results.concat(page2.data.results).concat(page3.data.results)
  let apisMap = apis.map(game=> {
    return {
        id: game.id,
        name:game.name,
        released: game.released,
        rating: game.rating,
        description: game.slug,
        genres: game.genres.map((z) => z),
        platforms: game.platforms.map((z) => z)
    }
    return apisMap
  })
  } */
module.exports = getInfoApi;
