import {Router}from 'express';
import { reingresoPersona, getPersonas, getPersona, deletePersona, postPersona, putPersona, eliminarPersona, getPersonaPasiva } from '../controllers/persona.controller';

const router = Router();
router.get('/personaPasivos', getPersonaPasiva);
router.get('/', getPersonas);
router.get('/:id', getPersona);
router.delete('/:id', deletePersona);
router.post('/', postPersona);
router.put('/:id', putPersona);
router.put('/eliminar/:id', eliminarPersona);
router.put('/reingreso/:id', reingresoPersona); 

export default router;