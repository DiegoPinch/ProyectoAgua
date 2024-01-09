import { Request, Response } from 'express';
import connection from '../db/connection';

export const getTarifasAgua = async (req: Request, resp: Response) => {
    connection.query('SELECT * FROM TarifasAgua', (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
};
export const getTarifasRiego = async (req: Request, resp: Response) => {
    connection.query('SELECT * FROM TarifasAgua WHERE tip_serv = "RIEGO"', (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
};
export const getTarifasConsumo = async (req: Request, resp: Response) => {
    connection.query('SELECT * FROM TarifasAgua WHERE tip_serv = "CONSUMO"', (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
};
export const getTarifaAguaPorId = async (req: Request, resp: Response) => {
    const tarifaId = req.params.id;
    connection.query('SELECT * FROM TarifasAgua WHERE id = ?', tarifaId, (err, data) => {
        if (err) throw err;
        resp.json(data);
    });
};

export const crearTarifaAgua = async (req: Request, resp: Response) => {
    const { tipo_servicio, basico, exceso } = req.body;
    connection.query('INSERT INTO TarifasAgua (tip_serv, basico, exceso) VALUES (?, ?, ?)',
        [tipo_servicio, basico, exceso],
        (err, data) => {
            if (err) throw err;
            resp.json({ message: 'Tarifa de agua creada correctamente' });
        }
    );
};

export const actualizarTarifaAgua = async (req: Request, resp: Response) => {
    const tarifaId = req.params.id;
    const { basico, exceso, met_cubicos } = req.body;
    connection.query(
        'UPDATE TarifasAgua SET basico = ?, exceso = ?, met_cubicos = ? WHERE id = ?',
        [basico, exceso, met_cubicos, tarifaId],
        (err, data) => {
            if (err) throw err;
            resp.json({ message: 'Tarifa de agua actualizada correctamente' });
        }
    );
};

export const eliminarTarifaAgua = async (req: Request, resp: Response) => {
    const tarifaId = req.params.id;
    connection.query('DELETE FROM TarifasAgua WHERE id = ?', tarifaId, (err, data) => {
        if (err) throw err;
        resp.json({ message: 'Tarifa de agua eliminada correctamente' });
    });
};
