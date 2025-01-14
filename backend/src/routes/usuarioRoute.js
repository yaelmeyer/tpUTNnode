import { Router } from 'express'
import { agregarFavorito, loginUsuario } from '../controllers/usuarioController.js'
import {authValidator} from '../middlewares/authValidator.js'

const usuarioRouter = Router()

usuarioRouter.post('/login', loginUsuario)
usuarioRouter.post('/agregarfavorito', authValidator, agregarFavorito)

export {usuarioRouter}