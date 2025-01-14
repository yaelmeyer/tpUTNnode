import { Usuario } from "../models/usuarioModel.js";
import { usuarioSchemaZod } from "../validators/usuarioValidator.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

process.loadEnvFile()
const JWT_SECRET = process.env.JWT_SECRET

const loginUsuario = async(req, res) =>{ 
    try {
        const {email, password} = req.body
        // const hashedPassword = await bcryptjs.hash(password, 10)
        // console.log(hashedPassword)
        if (!email || !password) {
            return res.status(400).json({ message: "Datos faltantes, email o contraseña" })
        }
        
        const usuarioValidado = usuarioSchemaZod.partial().parse({email, password})       
        const usuario = await Usuario.findOne({email: usuarioValidado.email})
        
        if(!usuario)
            return res.status(404).json({message: 'usuario incorrecto'})

        const passwordValidada = await bcryptjs.compare(usuarioValidado.password, usuario.password)

        if (!passwordValidada) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
          }
        
        const payload = { id: usuario._id, name: usuario.name, email: usuario.email }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

        res.json({ usuario, token })        
    } catch (error) {
        console.log('ERROR en login: ' + error.message)
        return res.status(500).json({message: 'ERROR al loguearse'})
    }
}

export {loginUsuario}