import {Router}from 'express';
import { getMedidores, getMedidor,deleteMedidor, putMedidor, postMedidor, getMedidorReptido } from '../controllers/medidores.controller';

const router = Router();

router.get('/', getMedidores);
router.get('/:id', getMedidor);
router.get('/:id/:tipo', getMedidorReptido);
router.put('/delete/:id', deleteMedidor);
router.put('/update/:id', putMedidor);
router.post('/', postMedidor);



export default router;