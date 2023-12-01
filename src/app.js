import express from "express";
import mongoose from "mongoose"
import path from "path";
import { PokeServiceDB } from "./services/pokemonServices.js";

const pokemons = new PokeServiceDB()

import {__dirname} from './utils.js'
import config from './config/config.js'

import viewsRouter from './router/views.router.js'


const publics = path.join(__dirname, './public')

const app = express()

app.use(express.static(publics))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', viewsRouter)

app.listen(config.port, (err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("Server listening on port"+config.port)
})

const pokemon ={
    name: "prbando",
    abilities: "pdawdaw",
    height: 12
}
const newPoke = pokemons.addPoke(pokemon)
export default app

