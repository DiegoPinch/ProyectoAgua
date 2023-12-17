import {Router}from 'express';
import {getAdministracion } from '../controllers/loginAdministracion.controller';

const router = Router();
router.get('/:cedula/:contra', getAdministracion);
export default router;