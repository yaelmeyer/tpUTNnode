import express from "express"
import {connectDB} from './config/mongoConnection.js'
import cors from 'cors'

import {serieRouter} from "./routes/seriesRouter.js"

process.loadEnvFile()

const PORT = process.env.PORT ?? 8090
const URI_DB = process.env.URI_DB

const app = express()

app.use(express.json())
app.use(cors())

//series
app.use('/api/series', serieRouter)

app.use("*", (req, res) => {
    res.status(404).json({ error: "resource not found" })
})

app.listen(PORT, () => {
    console.log("server en escucha por el puerto http://127.0.0:" + PORT)
    connectDB(URI_DB)
})