import { Serie } from '../models/serieModel.js'
import { Usuario } from '../models/usuarioModel.js'
import { serieSchemaZod } from '../validators/seriesValidator.js'
import { mongoose } from 'mongoose'

const getAllSeries = async(req, res) =>{
    // console.log('buscando series...')
    try {
        const series = await Serie.find();
        // console.log('series encontradas: '+ JSON.stringify(series))
        res.status(200).json(series)
    } catch (error) {
        res.status(500).json({message: 'error al obtener las series: ', error: error.message})
    }
}

const obtenerSeriesPorIds = async(req, res) => {
    try {
        // Convertir los IDs a ObjectId
        // console.log(req.body.ids)
        // console.log(req.body)
        const ids = req.body.ids.map(id => new mongoose.Types.ObjectId(id));
        // console.log(ids)
        const series = await Serie.find({ _id: { $in: ids } });
        // console.log('favoritos encontrados: '+ series)
        res.status(200).json(series)
    } catch (error) {
        console.error('Error al obtener series:', error);
        res.status(500).json({message: 'error al obtener favoritos: ', error: error.message})
    }
}

// i es para no distinguir entre mayusculas y minusculas
const getSeriesByNombre = async(req, res) =>{
    const {nombre} = req.body
    try {
        const series = await Serie.find({nombre: {$regex: nombre, $options: 'i'}})
        res.status(200).json(series)
    } catch (error) {
        res.status(500).json({message: 'error al obtener las series por nombre: ', error: error.message})
    }
}

const getSeriesByMinCap = async(req, res) =>{
    const {minCaps} = req.body
    try {
        const series = await Serie.find({cantCapitulos: {$gte: minCaps}})
        res.status(200).json(series)
    } catch (error) {
        res.status(500).json({message: 'error al obtener las series por capitulos minimos: ', error: error.message})
    }
}

const getSeriesByMaxCap = async(req, res) =>{
    const {maxCaps} = req.body

    try {
        const series = await Serie.find({cantCapitulos: {$lte: maxCaps}})
        res.status(200).json(series)
    } catch (error) {
        res.status(500).json({message: 'error al obtener las series por capitulos maximos: ', error: error.message})
    }
}

const saveSerie = async(req, res) =>{
    try {
        const serieValidada = serieSchemaZod.parse(req.body)
        const nuevaSerie = new Serie(serieValidada)

        await nuevaSerie.save()

        res.status(200).json(nuevaSerie)
    } catch (error) {
        res.status(500).json({message: 'error al guardar la serie: ', error: error.message})
    }
}

const updateSerie = async(req, res) =>{
    const {nombre}  = req.body
    try {
        const serieValidada = serieSchemaZod.partial().parse(req.body)
        const serieActualizada = await Serie.findOneAndUpdate({nombre}, serieValidada, {new:true})

        if(!serieActualizada)
            return res.status(400).json({error: 'no se encuentro la serie con nombre: ' + nobmre})

        res.json(serieActualizada)
    } catch (error) {
        res.status(500).json({message: 'error al actualizar la serie: ', error: error.message})
    }
}

const deleteSerie = async(req, res) =>{
    const {nombre}  = req.body

    try {
        const serie = await Serie.findOneAndDelete({nombre})

        if(!serie)
            return res.status(400).json({error: 'no se encuentro la serie con nombre: ' + nombre})

        res.json({message: 'serie con nombre: ' + nombre + ' fue eliminada'})
    } catch (error) {
        res.status(500).json({message: 'error al eliminar la serie: ', error: error.message})
    }
}

//funcion con metodo de agregacion
//para calcular el promedio de capitulos de las series favoritas
const promedioCapsFavoritos = async(req, res) =>{
    const {email} = req.body

    const usuario = await Usuario.findOne({email})

    const {favoritos} = usuario

    const ids = favoritos.map(id => new mongoose.Types.ObjectId(id));

    try {
        const promedio = await Serie.aggregate([
            {
                $match:{
                    _id: {$in: ids}
                }
            },
            {
              $group: {
                    _id: null,
                  promedioCaps: {$avg: "$cantCapitulos"}
              }
            },
              {
                  $sort: {promedioCaps:1}
                }
        ])

        return res.json({promedio: promedio})
    } catch (error) {
        res.status(500).json({message: 'error al calcular promedio de caps de series favoritas: ', error: error.message})
    }
}

export {getAllSeries, obtenerSeriesPorIds, getSeriesByNombre, getSeriesByMinCap, getSeriesByMaxCap, saveSerie, updateSerie, deleteSerie, promedioCapsFavoritos}