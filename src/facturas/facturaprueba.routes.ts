import { Router } from 'express';
import { generarFactura } from '../controllers/facturasPDF.controller';

const router = Router();

// Ruta para generar la factura con parámetros
router.get('/generar-factura/:cedulaUsuario/:mes/:tipo', generarFactura);

export default router;
