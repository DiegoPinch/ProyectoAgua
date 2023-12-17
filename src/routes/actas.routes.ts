import {Router}from 'express';
import { postActas, getActas, deleteActa } from '../controllers/actas.controller'

const router = Router();

router.get('/', getActas );
router.post('/', postActas);
router.delete('/:id', deleteActa);
//router.put('/:id', putPersona);

export default router;