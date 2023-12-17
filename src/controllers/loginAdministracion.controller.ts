import { Request, Response } from 'express';
import connection from '../db/connection';

export const getAdministracion = async (req: Request, resp: Response) => {
    const cedula = req.params.cedula;
    const contra = req.params.contra;

    const sqlQuery = `
    SELECT D.*, U.*
    FROM DETALLE_DIRECTIVA D, USUARIOS U
    WHERE U.CED_USU= D.CED_USU_DIR
    AND D.ESTADO= 'Activo'
    AND D.CED_USU_DIR = ?
    AND D.CONTRASENA =?
    `;
    connection.query(sqlQuery, [cedula, contra], (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
}

export const loginUsuario = async (req: Request, resp: Response) => {
    const cedula = req.params.cedula;
    const contra = req.params.contra;

    const sqlQuery = `
    SELECT * FROM USUARIOS WHERE CED_USU = ? AND CONTRASENA = ?
    `;
    connection.query(sqlQuery, [cedula, contra], (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
}