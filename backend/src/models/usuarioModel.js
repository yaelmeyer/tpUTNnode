import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favoritos:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Serie'}]
    },
    tipo:{
     type: String,
     enum: ['usuario', 'administrador'],
     required: true   
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export { Usuario }