import { Router } from 'express';
import { getTarifasAgua, getTarifaAguaPorId, crearTarifaAgua, actualizarTarifaAgua, eliminarTarifaAgua, getTarifasConsumo, getTarifasRiego } from '../controllers/tarifaAgua.controller';

const router = Router();

router.get('/consumo', getTarifasConsumo)
router.get('/riego', getTarifasRiego)
router.get('/', getTarifasAgua);
router.get('/:id', getTarifaAguaPorId);
router.post('/', crearTarifaAgua);
router.put('/:id', actualizarTarifaAgua);
router.delete('/:id', eliminarTarifaAgua);

export default router;
