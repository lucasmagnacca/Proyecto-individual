const { Router } = require('express');
const {Genre} = require("../db.js")
const { default: axios } = require('axios');
const getGenres = require("../utils/funtion/getGenres")
const router = Router();

router.get('/', async (req,res) => {
try {
    let instancias = await Genre.findAll();
    if(instancias === []){
        res.send(instancias);
    }
    else{
    instancias = await getGenres()
    res.send(instancias);
    }
    
} catch (error) {
    console.log(error)
}
})


module.exports = router;