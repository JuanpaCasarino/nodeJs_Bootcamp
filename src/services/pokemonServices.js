import pokemon from "../models/pokemon.model.js";


export class PokeServiceDB {
    async getAllPoke(){
        const pokemons = await pokemon.find()
    }
    async getPokeById(name){
        const poke = await pokemon.findOne({ name: name })
        return poke
    }

    async addPoke(info){
        const { name, abilities, height } = info;
        
        const newPoke = await pokemon.create(info)
        console.log("Pokemon added to the DB:")
        console.log("Name: "+newPoke.name)
        console.log("Abilities: "+newPoke.abilities)
        console.log("Height: "+newPoke.height)
        return newPoke
    }
}