const { Router } = require('express');



// Variables de rutas
const videogameDetailRoutes = require('./videogameDetail');
const videogamesRoutes = require('./videogames');
const genresRoutes = require('./genres');
const plataformRoutes = require("./plataforms")

// Llamamos al router
const router = Router();

// Conexión de las rutas
router.use('/videogame',videogameDetailRoutes);
router.use('/videogames',videogamesRoutes);
router.use('/genres',genresRoutes);
router.use('/plataform', plataformRoutes);


module.exports = router;
