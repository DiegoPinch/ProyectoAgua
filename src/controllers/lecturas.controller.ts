import { Request, Response } from 'express';
import connection from '../db/connection';

//para el buscar persona con medidor especificado
export const getPersonaMedidor = async (req: Request, resp: Response) => {
  const { tipo } = req.params;

  connection.query(
    'SELECT U.*, M.* FROM usuarios U, medidores M WHERE U.CED_USU = M.CED_USU_MED AND M.ESTADO = "ACTIVO" AND M.TIPO_MED = ?',
    tipo,
    (err, data) => {
      if (err) throw err;
      resp.json(data);
    }
  );
}
//obtener el la lectura ingreso del medidor
export const getLecturaIngreso = async (req: Request, resp: Response) => {
  const id = req.params.id;
  const sqlQuery = `
  SELECT * FROM medidores WHERE ID_MED = ?
  `;
  connection.query(sqlQuery, [id], (err, data) => {
    if (err) throw err;
    resp.json(data);
  });
}

//buscar la lectura anterior
export const getLecturaActual = async (req: Request, resp: Response) => {
  const cedula = req.params.cedula;
  const tipo = req.params.tipo;
  const mes = req.params.mes;

  const sqlQuery = `
    SELECT U.CED_USU, M.TIPO_MED, L.*
    FROM usuarios U, medidores M, lecturas L
    WHERE U.CED_USU = M.CED_USU_MED
    AND M.ID_MED = L.ID_MED_LEC
    AND U.CED_USU = ?
    AND M.TIPO_MED = ?
    AND L.MES_CON = ?
  `;

  connection.query(sqlQuery, [cedula, tipo, mes], (err, data) => {
    if (err) throw err;
    resp.json(data);
  });
}

export const verificarEstadoFactura = async (req: Request, resp: Response) => {
  const cedula = req.params.cedula;
  const tipo = req.params.tipo;
  const mes = req.params.mes;

  const sqlQuery = `
    SELECT * FROM FACTURAS WHERE EST_FACT = "" AND ID_LEC_PER = ?
  `;
  connection.query(sqlQuery, [cedula, tipo, mes], (err, data) => {
    if (err) throw err;
    resp.json(data);
  });
}

//insertarLecturas
export const postLecturas = async (req: Request, resp: Response) => {
  const { body } = req;
  connection.query('INSERT INTO LECTURAS SET ?', [body], (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      resp.status(500).json({
        error: 'Error al insertar datos en la base de datos',
      });
    } else {
      const insertedId = result.insertId;
      resp.status(200).json({
        msg: 'Datos insertados con éxito',
        ID_LEC: insertedId,
      });
    }
  });
};

//VERIFICAR SI HAY LECTURA EXISTENTE EN DICHO MES
export const verificarLectura = async (req: Request, resp: Response) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const mes = req.params.mes;
      const id = req.params.id;
      connection.query('SELECT * FROM lecturas WHERE MES_CON = ? AND ID_MED_LEC = ?', [mes, id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    resp.json(data);
  } catch (error) {
    resp.status(500).json({ message: 'Error al realizar la consulta' });
  }
};

//obtener LA TBALE DE los datos de la lectura
export const getLectura = async (req: Request, resp: Response) => {
  const tipo = req.params.tipo;
  const mes = req.params.mes;
  const sqlQuery = `
  SELECT U.*, M.*, L.*
  FROM usuarios U, medidores M, lecturas L
  WHERE U.CED_USU = M.CED_USU_MED
  AND M.ID_MED = L.ID_MED_LEC
  AND M.TIPO_MED = ?
  AND L.MES_CON = ?
  `;
  connection.query(sqlQuery, [tipo, mes], (err, data) => {
    if (err) throw err;
    resp.json(data);
  });
}

//obtener LA TBALE DE los datos de la lectura
export const getUltimaLectura = async (req: Request, resp: Response) => {
  const id = req.params.id;
  const sqlQuery = `
  SELECT *
  FROM lecturas
  WHERE ID_MED_LEC = ?
  ORDER BY FEC_ING_LEC DESC
  LIMIT 1;
  `;
  connection.query(sqlQuery, [id], (err, data) => {
    if (err) throw err;
    resp.json(data);
  });
}

export const putLectura = async (req: Request, resp: Response) => {
  const id = req.params.id; // ID de la persona a editar
  const lectura = req.params.lectura; // Nuevo valor para LEC_ACT

  // Consulta para verificar la condición en FACTURAS
  connection.query('SELECT * FROM FACTURAS WHERE EST_FACT = "PAGADO" AND ID_LEC_PER =  ?', [id], (err, result) => {
    if (err) {
      console.error('Error al verificar la condición en FACTURAS', err);
      resp.status(500).json({
        error: 'Error al verificar la condición en FACTURAS'
      });
    } else {
      // Verificar si se encontraron datos que cumplen con la condición
      if (result.length === 0) {
        // No se encontraron datos que cumplan la condición, proceder con la actualización en LECTURAS
        connection.query('UPDATE LECTURAS SET LEC_ACT = ? WHERE ID_LEC = ?', [lectura, id], (err, data) => {
          if (err) {
            console.error('Error al editar la lectura', err);
            resp.status(500).json({
              error: 'Error al editar la lectura'
            });
          } else {
            resp.json({
              msg: "Editada con éxito"
            });
          }
        });
      } else {
        // Se encontraron datos que cumplen con la condición, no se realiza la actualización
        resp.status(409).json({
          error: 'No se puede actualizar la lectura porque hay facturas pendientes relacionadas'
        });
      }
    }
  });

};



