import express from "express"
import {connectDB} from './config/mongoConnection.js'
import { usuarioRouter } from "./routes/usuarioRoute.js"
import cors from "cors"

process.loadEnvFile()

const PORT = process.env.PORT ?? 8090
const URI_DB = process.env.URI_DB

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/usuario', usuarioRouter)

app.use("*", (req, res) => {
    res.status(404).json({ error: "resource not found" })
  })

app.listen(PORT, () => {
    console.log("server en escucha por el puerto http://127.0.0:" + PORT)
    connectDB(URI_DB)
})