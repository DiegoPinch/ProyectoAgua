import {Router}from 'express';
import { postDetalleDirectiva, getDetalleDirectiva, deleteDetalleDirectiva } from '../controllers/detalle_directiva.controller'

const router = Router();

router.get('/', getDetalleDirectiva );
router.post('/', postDetalleDirectiva);
router.delete('/:id', deleteDetalleDirectiva);
//router.put('/:id', putPersona);

export default router;