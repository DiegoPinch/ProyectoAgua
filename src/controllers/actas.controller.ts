import { Request, Response } from 'express';
import connection from '../db/connection';


export const postActas = async (req: Request, resp: Response) => {
    const { body } = req;
    try {
        connection.query('INSERT INTO ACTAS SET ?', [body], (err, data) => {
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

export const getActas = async (req: Request, resp: Response) => {
    connection.query('SELECT S.*, A.* FROM SESION S, ACTAS A WHERE S.ID_SESION = A.ID_SESION_ACT', (err, data) => {
        if (err) throw err;
        resp.json(data);
    })
}

export const deleteActa = async (req: Request, resp: Response) => {
    const { id } = req.params;
    connection.query('DELETE FROM ACTAS WHERE ID_ACT = ?', id, (err, data) => {
        if (err) throw err;
        resp.json({
            msg: "Eliminado con exito"

        })
    })
}