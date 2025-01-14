import { Router } from 'express'
import { deleteSerie, getAllSeries, getSeriesByMaxCap, getSeriesByMinCap, getSeriesByNombre, obtenerSeriesPorIds, saveSerie, updateSerie } from '../controllers/SeriesController.js'

const serieRouter = Router()

serieRouter.get('/', getAllSeries)

serieRouter.get('/favoritos', obtenerSeriesPorIds)

serieRouter.get('/byNombre', getSeriesByNombre)

serieRouter.get('/byMinCaps', getSeriesByMinCap)

serieRouter.get('/byMaxCaps', getSeriesByMaxCap)

serieRouter.post('/', saveSerie)

serieRouter.patch('/', updateSerie)

serieRouter.delete('/', deleteSerie)

export { serieRouter }