import { Router } from 'express'
import { loginUsuario } from '../controllers/usuarioController.js'
import {authValidator} from '../middlewares/authValidator.js'

const usuarioRouter = Router()

usuarioRouter.post('/login', loginUsuario)

export {usuarioRouter}