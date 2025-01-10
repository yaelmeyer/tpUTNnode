import { Serie } from '../models/serieModel.js'

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
    const {nombre, cantCapitulos, generos, descripcion} = req.body
    try {
        const nuevaSerie = new Serie({nombre, descripcion, generos, cantCapitulos})
        await nuevaSerie.save()

        res.status(200).json(nuevaSerie)
    } catch (error) {
        res.status(500).json({message: 'error al guardar la serie: ', error: error.message})
    }
}

const updateSerie = async(req, res) =>{
    const {nombre}  = req.body
    const serie = req.body

    console.log(serie)

    try {
        const serieActualizada = await Serie.findOneAndUpdate({nombre}, serie, {new:true})

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

export {getAllSeries, getSeriesByNombre, getSeriesByMinCap, getSeriesByMaxCap, saveSerie, updateSerie, deleteSerie}