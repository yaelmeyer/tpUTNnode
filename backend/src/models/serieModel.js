import mongoose from "mongoose"

const SerieSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    descripcion:{
        type: String,
        trim: true,
        default: 'sin descripcion'
    },
    generos:{
        type: [String],
        required: true
    },
    cantCapitulos:{
        type: Number,
        required: true
    }

})

const Serie = mongoose.model("Serie", SerieSchema)

export { Serie }