import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Cards";

export default function Home(){
const dispatch = useDispatch
const allVideogames= useSelector((state)=> state.videogames)

useEffect(()=>{
    dispatch(getVideogames)
},[dispatch])


function handleCLick(e){
e.preventDefault()
dispatch(getVideogames())
}

return(
    <div>
        <Link to="/videogame">Crear personaje</Link>
        <h1>juegos</h1>
        <button onClick={(e) => {handleCLick(e)}}>volver a cargar los juegos</button>
    

{allVideogames?.map( (el) =>{
    return(
    <Card name={el.name} genre={el.genre} image={el.image} />
    )
})}
</div>
)
}