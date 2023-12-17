import {Router}from 'express';
import {loginUsuario } from '../controllers/loginAdministracion.controller';

const router = Router();
router.get('/:cedula/:contra', loginUsuario);
export default router;