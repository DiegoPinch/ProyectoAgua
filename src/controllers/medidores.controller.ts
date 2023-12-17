import { Request, Response } from 'express';
import connection from '../db/connection';


export const getMedidores = async (req: Request, resp: Response) => {

    connection.query('SELECT M.*,U.* FROM USUARIOS U, MEDIDORES M WHERE U.CED_USU = M.CED_USU_MED AND M.ESTADO = "ACTIVO" ORDER BY U.APE_USU ASC', (err, data) => {
        if (err) throw err;
        resp.json(data);
    })

}

export const getMedidor = async (req: Request, resp: Response) => {
    const { id } = req.params;
    connection.query('SELECT M.*, U.* FROM USUARIOS U, MEDIDORES M WHERE U.CED_USU = M.CED_USU_MED AND U.CED_USU = ?', id, (err, data) => {
        if (err) throw err;
        resp.json(data);
    })
}
export const getMedidorReptido = async (req: Request, resp: Response) => {
    const { id } = req.params;
    const { tipo } = req.params;
    connection.query('SELECT * FROM MEDIDORES WHERE  ESTADO = "ACTIVO" AND CED_USU_MED = ? AND TIPO_MED = ?', [id, tipo], (err, data) => {
        if (err) throw err;
        resp.json(data);
    })
}
export const deleteMedidor = async (req: Request, resp: Response) => {
    const { id } = req.params;
    connection.query('UPDATE MEDIDORES SET ESTADO = ? WHERE ID_MED = ?', ['PASIVO', id], (err, data) => {
        if (err) throw err;
        resp.json({
            msg: "Eliminado con éxito"
        });
    });
}

export const postMedidor = async (req: Request, resp: Response) => {
    const { body } = req;
    connection.query('INSERT INTO MEDIDORES SET ?', [body], (err, data) => {
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
}

export const putMedidor = async (req: Request, resp: Response) => {
    const { id } = req.params; 
    const { body } = req; 
    connection.query('UPDATE MEDIDORES SET ? WHERE ID_MED = ?', [body, id], (err, data) => {
        if (err) {
            console.error('Error al editar la persona', err);
            resp.status(500).json({
                error: 'Error al editar la persona'
            });
        } else {
            resp.json({
                msg: "Editada con éxito"
            });
        }
    });
};
