import { Router } from "express";
import config from "../config/config.js";

const getGeneral = (req, res)=>{
    res.json("Hola mundo")
}

export {getGeneral}