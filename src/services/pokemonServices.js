import pokemon from "../models/pokemon.model.js";


export class PokeServiceDB {
    async getAllPoke(){
        const pokemons = await pokemon.find()
    }
    async getPokeById(name){
        const poke = await pokemon.findOne({ name: name })
        if(!name) return "No existe este Pokemon guardado en la base de datos"
        return poke
    }

    async addPoke(info){
        const { name, abilities, height } = info;
        
        const newPoke = await pokemon.create(info)
        console.log("Pokemon agregado a la base de datos!")
        return newProduct
    }
}