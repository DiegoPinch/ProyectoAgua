
import { Request, Response } from 'express';
import connection from '../db/connection';


export const getFacturas = async (req: Request, resp: Response) => {
    const cedula = req.params.cedula;
    const sqlQuery = `
  SELECT U.*, M.*, L.*, F.*
  FROM usuarios U, medidores M, lecturas L, facturas F
  WHERE U.CED_USU = M.CED_USU_MED
  AND M.ID_MED = L.ID_MED_LEC
  AND L.ID_LEC = F.ID_LEC_PER
  AND F.EST_FACT = 'PENDIENTE'
  AND U.CED_USU = ?
  `;

    try {
        const data = await new Promise((resolve, reject) => {
            connection.query(sqlQuery, [cedula], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        resp.json(data);
    } catch (error) {
        resp.status(500).json({ error: 'Error al obtener facturas' });
    }
}

export const putFacturas = async (req: Request, resp: Response) => {
    const id = req.params.id; // ID de la factura a editar
    const fecha = req.params.fecha; // Nueva fecha de pago
    try {
        await new Promise((resolve, reject) => {
            connection.query('UPDATE facturas SET FEC_PAGO = ?, EST_FACT = "PAGADO" WHERE ID_FACT = ?',
                [fecha, id], (err, data) => {
                    if (err) {
                        console.error('Error al editar la FACTURA', err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
        resp.json({
            msg: "Factura editada con éxito"
        });
    } catch (error) {
        resp.status(500).json({
            error: 'Error al editar la FACTURA'
        });
    }
};
export const putFacturaLectura = async (req: Request, resp: Response) => {
    const id = req.params.id; 
    const exceso = req.params.exceso; 
    const suma = req.params.suma; 
    try {
        await new Promise((resolve, reject) => {
            connection.query('UPDATE facturas SET EXC_LECTURA = ?, SUM_TOTAL = ? WHERE ID_LEC_PER = ?',
                [exceso, suma, id], (err, data) => {
                    if (err) {
                        console.error('Error al editar la FACTURA', err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });

        resp.json({
            msg: "Factura editada con éxito"
        });
    } catch (error) {
        resp.status(500).json({
            error: 'Error al editar la FACTURA'
        });
    }
};

export const postFacturas = async (req: Request, resp: Response) => {
    const { body } = req;
    try {
        connection.query('INSERT INTO FACTURAS SET ?', [body], (err, data) => {
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

