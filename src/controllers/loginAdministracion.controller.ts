import { Request, Response } from 'express';
import connection from '../db/connection';
import bcrypt from 'bcrypt';

export const getAdministracion = async (req: Request, res: Response) => {
    const cedula = req.params.cedula;
    const contra = req.params.contra;

    try {
        const sqlQuery = `
        SELECT U.*, D.CONTRASENA, D.CARGO
        FROM DETALLE_DIRECTIVA D, USUARIOS U
        WHERE U.CED_USU = D.CED_USU_DIR
        AND D.ESTADO = 'Activo'
        AND D.CED_USU_DIR = ?
        `;

        connection.query(sqlQuery, [cedula], async (err, data) => {
            if (err) {
                console.error('Error al obtener datos del usuario:', err);
                return res.status(500).json({ error: 'Error al obtener datos del usuario' });
            }

            if (data.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }

            const usuario = data[0];
            const contrasenaAlmacenada = usuario.CONTRASENA;
            const contrasenaValida = await bcrypt.compare(contra, contrasenaAlmacenada);
            if (!contrasenaValida) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
            return res.status(200).json(usuario);
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
};

export const loginUsuario = async (req: Request, resp: Response) => {
    const cedula = req.params.cedula;
    const contra = req.params.contra;
    const sqlQuery = `
    SELECT *  FROM USUARIOS WHERE ESTADO = 'ACTIVO' AND CED_USU = ? AND CONTRASENA = ?
    `;
    connection.query(sqlQuery, [cedula, contra], (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
}