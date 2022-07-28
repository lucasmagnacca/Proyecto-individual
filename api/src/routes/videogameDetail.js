const { Router, query } = require('express');
const { v4: uuidv4 } = require("uuid");
const {Platform, Genre, Videogame} = require("../db.js")
const axios = require("axios");
const router = Router();
const { API_KEY } = process.env;
require('dotenv').config();

// En el caso de que no pasen nada...
router.get('/:id',async (req,res) => {
    // Recibe los datos recolectados desde el formulario controlado de la ruta de reación de videojuego por body..
    const {id} = req.params
    if(id.length > 8){
       
        const video = await Videogame.findByPk(id, {
        include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }, { // ----
            model: Platform,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }],
    })
        res.send(video)
    }
    else{
        console.log("hlsdasdsa")
        try {
            let details = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            details= details.data
            let returnObj = {
                background_image: details.background_image,
                name: details.name,
                genres: details.genres,
                platforms: details.platforms,
                rating: details.rating,
                description_raw: details.description_raw,
                released: details.released,
            }

            res.send(returnObj)
           
        } catch (e) {
            console.log(e)
        }
    }
})
    /**
     * Formulario enviado por body...
     * Nombre:
     * Descripción:
     * Lanzamiento:
     * Rating:
     * 
     * 
     * Observaciones:
     * - Posibilidad de seleccionar/agregar varios géneros.
     * - Posibilidad de seleccionar/agregar varias plataformas.
     * 
     * 
     */
    
    router.post("/", async (req, res) => {
        const { name, description, launch, rating, image, platforms, genres} = req.body 
        try {
            const instancias = await Videogame.create({
                name,
                description,
                launch,
                image,
                rating,
                createdInDb: true,
                id: uuidv4()
            });
            // ..... ..... ..... ..... ..... .....
            // Los géneros y plataformas ya los tengo, habrá que unirlos.
         /*    let genreDb = await Genre.findAll({
                where: { name: genres }
            });
            let platformDb = await Platform.findAll({
                where: { name: platforms }
            });
            // ..... ..... ..... ..... ..... .....
            instancias.addGenres(genreDb);
            instancias.addPlatform(platformDb); */
            // ..... ..... ..... ..... ..... .....
            res.send('Videojuego creado correctamente!' + instancias.id);
            // ..... ..... ..... ..... ..... .....
    
        } catch (error) { console.log(error) };
    
    });
    
    


// En el caso de que manden algún id..
// Creo que esta parte sería por query

module.exports = router;