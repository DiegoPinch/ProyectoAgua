import { Router } from 'express';
import { getPersonaMedidor, getLecturaActual, postLecturas, getLectura, putLectura, getLecturaIngreso, verificarLectura,getUltimaLectura } from '../controllers/lecturas.controller';

const router = Router();

router.get('/ingresolectura/:id', getLecturaIngreso); 
router.get('/ultimalectura/:id', getUltimaLectura);
router.get('/verificarlectura/:mes/:id', verificarLectura);
router.get('/:cedula/:tipo/:mes', getLecturaActual);
router.put('/:lectura/:id', putLectura);
router.get('/:tipo/:mes', getLectura);
router.get('/:tipo', getPersonaMedidor);
router.post('/', postLecturas);


export default router;