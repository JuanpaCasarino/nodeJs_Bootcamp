import { Schema, model } from "mongoose";
import mongoose from "mongoose";

import db from "../db.js";

const pokeCollection = "pokemons"

const pokeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      abilities: {
        type: Array,
        required: false,
      },
      height: {
        type: Number,
        required: true,
      },
})

const pokemon = db.model(pokeCollection, pokeSchema)

export default pokemon