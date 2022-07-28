const { Router } = require('express');
const {Platform} = require("../db.js")
const axios = require("axios");
const generatePlatforms = require("../utils/funtion/getplata")
const router = Router();

router.get('/', async (req,res) => {
try {
    let instancias = await Platform.findAll();
    if(instancias === []){
        res.send(instancias);
    }
    else{
    instancias = await generatePlatforms()
    res.send(instancias);
    }
    
} catch (error) {
    console.log(error)
}
})


module.exports = router;