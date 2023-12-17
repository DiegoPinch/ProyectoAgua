import {Router}from 'express';
import { getFacturas, putFacturas, postFacturas, putFacturaLectura } from '../controllers/Facturas.controller';

const router = Router();
router.get('/:cedula', getFacturas);
router.put('/:fecha/:id', putFacturas);
router.put('/update/:exceso/:suma/:id', putFacturaLectura);
router.post('/', postFacturas);
export default router;