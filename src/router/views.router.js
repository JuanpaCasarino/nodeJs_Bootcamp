import {Router} from 'express'

const router = Router()

import { getGeneral, popPokemons, pokemonByName } from '../controllers/views.controller.js'

router.get('/', getGeneral)

router.get('/pokemons', popPokemons )

router.get('/pokemons/:name', pokemonByName)

export default router