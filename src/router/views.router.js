import {Router} from 'express'

const router = Router()

import { getGeneral, popPokemons, imageByName, pokeByName } from '../controllers/views.controller.js'

router.get('/', getGeneral)

router.get('/pokemons', popPokemons )

router.get('/pokemons/:name', pokeByName)

router.get('/pokemons/image/:name', imageByName)

export default router