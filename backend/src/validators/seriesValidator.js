import { z } from 'zod'

//el minimo del nombre es 1 porque hay una serie llamada "V"
const serieSchemaZod = z.object({
    nombre: z.string({message: 'el nombre debe ser un string'}).trim().min(1, 'El nombre de la serie es obligatorio'),
    descripcion: z.string({message: 'la descripcion debe ser un string'}).trim().optional().default('sin descripcion'),
    generos: z.string().array({message: 'los generos deben ser strings'}).nonempty({message: 'la serie debe tener al menos un genero'}),
    cantCapitulos: z.number({message: 'la cantidad de capitulos debe ser numerico'}).min(1, {message: 'la cantidad de capitulos debe ser al menos 1'})
})

export { serieSchemaZod }