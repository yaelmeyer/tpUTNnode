import mongoose from 'mongoose'

export const connectDB = async (URI_DB) =>{
    console.log('intentando conectarse a: '+ URI_DB)

    try{
        await mongoose.connect(URI_DB)
        console.log('conexion a mongoDB exitosa')
    } catch(error){
        console.log('conexion a mongoDB rechazada!!')
        console.log(error)
    }
}