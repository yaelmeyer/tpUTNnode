import { Router } from 'express'
import { deleteSerie, getAllSeries, getSeriesByMaxCap, getSeriesByMinCap, getSeriesByNombre, obtenerSeriesPorIds, promedioCapsFavoritos, saveSerie, updateSerie } from '../controllers/SeriesController.js'
import { authValidator } from '../middlewares/authValidator.js'

const serieRouter = Router()

serieRouter.get('/', getAllSeries)

serieRouter.post('/favoritos', authValidator, obtenerSeriesPorIds)

serieRouter.post('/promedioCapitulosFavoritos', authValidator, promedioCapsFavoritos)

serieRouter.get('/byNombre', getSeriesByNombre)

serieRouter.get('/byMinCaps', getSeriesByMinCap)

serieRouter.get('/byMaxCaps', getSeriesByMaxCap)

serieRouter.post('/', saveSerie)

serieRouter.patch('/', updateSerie)

serieRouter.delete('/', deleteSerie)

export { serieRouter }