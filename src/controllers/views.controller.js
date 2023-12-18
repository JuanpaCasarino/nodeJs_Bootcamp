import { Router } from "express";
import  express  from "express";
import https from 'https'
import config from "../config/config.js";

import { PokeServiceDB } from "../services/pokemonServices.js";
import { getUrlImageBuffer } from "../middlewares/getImage.js";


const pokemons = new PokeServiceDB()

const callbackPokemonResponse = (res) => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);
  
    res.on('data', chunk => {
      data.push(chunk);
    });
  
    res.on('end', () => {
      console.log('Response ended: ', new Date());
      const pokemons = JSON.parse(Buffer.concat(data).toString());
      const pokeList = []

        pokemons.results.forEach(p => {
            pokeList.push(' '+p.name)   
        });
        console.log("This is the complete list of Pokemons:"+pokeList)
    });
  };

const getGeneral = (req, res)=>{
    res.send("Hello World!")
}

const popPokemons = (req, res)=>{
    try {
        https.get('https://pokeapi.co/api/v2/pokemon?limit=300', callbackPokemonResponse)

        

        res.status(200).send(`Sucesss ${new Date()}`)
    } catch (error) {
        res.status(400).send("Error: "+error)
    }    
}

const pokeByName = async (req, res)=>{
  const name =req.params.name;
  const poke = await pokemons.getPokeById(name)
  if(!poke) {
    https.get(`https://pokeapi.co/api/v2/pokemon/${name}`, (response) => {
      let data = [];
      response.on('data', chunk => {
  
        data.push(chunk);
      });
  
      response.on('end', async () => {      
        const pokemon = JSON.parse(Buffer.concat(data).toString());  
        const abilities= []
        pokemon.abilities.forEach(p=>{
          abilities.push(' '+p.ability.name)
        }) 
        const info = {
          name: pokemon.name,
          abilities,
          height: pokemon.height
          }
        const newPoke = pokemons.addPoke(info)
        console.log("This Pokemon wasn't on the DB!")
        res.send('Name: '+pokemon.name+' ----- Abilities: '+abilities+' ----- Height: '+pokemon.height);         
      })
    })
  }else{
    console.log("This Pokemon was already added to the DB!")
    res.send('Name: '+poke.name+' ----- Abilities: '+poke.abilities+' ----- Height: '+poke.height);   
  }

  
}

const imageByName = (req, res)=>{
    const name = req.params.name;

    if (!name) return res.status(400).send('pokemon name is missing')
  
    https.get(`https://pokeapi.co/api/v2/pokemon/${name}`, (response) => {
      let data = [];
      response.on('data', chunk => {
        data.push(chunk);
      });
  
      response.on('end', async () => {        
        const pokemon = JSON.parse(Buffer.concat(data).toString());          
        const imageBuffer = await getUrlImageBuffer(pokemon.sprites.front_default)
        res.contentType('image/jpeg');
        res.send(imageBuffer);         
      })
    })
      .on('error', err => {
        console.log('Error: ', err.message);
      });
}

export {getGeneral, popPokemons, imageByName, pokeByName}