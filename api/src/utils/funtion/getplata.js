const axios = require("axios");
require("dotenv").config();
const { Platform } = require("../../db.js");
const { API_KEY } = process.env;
async function generatePlatforms(){
    // Traeme la data
    const genresInApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    const apiData = genresInApi.data.results;

    // Creame las plataformas
    apiData.forEach((x) => {
        Platform.findOrCreate({
            where: { name : x.name}
        });
    } );

    return 'Ok';


} 

module.exports = generatePlatforms;