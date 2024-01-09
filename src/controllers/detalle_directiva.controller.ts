import { Request, Response } from 'express';
import connection from '../db/connection';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const postDetalleDirectiva = async (req: Request, resp: Response) => {
    const { body } = req;
    try {
        // Generar el hash de la contraseña
        const hash = await bcrypt.hash(body.CONTRASENA, saltRounds);
        // Usar el hash en lugar de la contraseña original
        const datosConHash = { ...body, CONTRASENA: hash };

        connection.query('INSERT INTO DETALLE_DIRECTIVA SET ?', [datosConHash], (err, data) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                resp.status(500).json({
                    error: 'Error al insertar datos en la base de datos',
                });
            } else {
                resp.status(200).json({
                    msg: 'Datos insertados con éxito',
                });
            }
        });
    } catch (err) {
        console.error('Error al insertar datos:', err);
        resp.status(500).json({
            error: 'Error al insertar datos en la base de datos',
        });
    }
};

export const getDetalleDirectiva = async (req: Request, resp: Response) => {
    connection.query('SELECT * FROM DETALLE_DIRECTIVA', (err, data) => {
        if (err) throw err;
        resp.json(data);
    })
}

export const deleteDetalleDirectiva = async (req: Request, resp: Response) => {
    const { id } = req.params;
    connection.query('DELETE FROM DETALLE_DIRECTIVA WHERE ID_DET_DIR = ?', id, (err, data) => {
        if (err) throw err;
        resp.json({
            msg: "Eliminado con exito"

        })
    })
}