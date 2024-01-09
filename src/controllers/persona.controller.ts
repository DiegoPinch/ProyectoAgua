import { Request, Response } from 'express';
import connection from '../db/connection';


export const getPersonas = async(req: Request, resp: Response) => {

  connection.query('SELECT * FROM USUARIOS WHERE ESTADO = "Activo" ORDER BY APE_USU ASC', (err, data) => {
    if (err) throw err;
    resp.json(data);
  })

}

export const getPersonaPasiva = async(req: Request, resp: Response) => {

  connection.query('SELECT * FROM USUARIOS WHERE ESTADO = "PASIVO" ORDER BY APE_USU ASC', (err, data) => {
    if (err) throw err;
    resp.json(data);
  })

}

export const getPersona = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const searchTerm = `%${id}%`;

  const query = `
    SELECT * FROM USUARIOS 
    WHERE ESTADO = 'ACTIVO'
    AND (CED_USU LIKE ? OR NOM_USU LIKE ? OR APE_USU LIKE ?)
  `;

  connection.query(
    query,
    [searchTerm, searchTerm, searchTerm],
    (err, data) => {
      if (err) throw err;
      resp.json(data);
    }
  );
};


export const deletePersona = async(req: Request, resp: Response) => {

  const { id } = req.params;

  connection.query('DELETE FROM USUARIOS WHERE CED_USU = ?', id, (err, data) => {
    if (err) throw err;
    resp.json({
      msg: "Eliminado con exito"

    })
  })
}

export const postPersona = async (req: Request, resp: Response) => {
  const { body } = req;

  // Verificar si la cédula ya existe en la base de datos
  connection.query(
    'SELECT * FROM USUARIOS WHERE CED_USU = ?',
    body.CED_USU,
    (selectErr, selectData) => {
      if (selectErr) {
        console.error('Error al verificar la cédula:', selectErr);
        resp.status(500).json({
          error: 'Error al verificar la cédula en la base de datos',
        });
      } else {
        if (selectData && selectData.length > 0) {
          resp.status(400).json({
            error: 'La cédula ya existe en la base de datos',
          });
        } else {
          connection.query('INSERT INTO USUARIOS SET ?', [body], (err, data) => {
            if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                resp.status(400).json({
                  error: 'La clave primaria ya existe en la base de datos',
                });
              } else {
                console.error('Error al insertar datos:', err);
                resp.status(500).json({
                  error: 'Error al insertar datos en la base de datos',
                });
              }
            } else {
              resp.status(200).json({
                msg: 'Datos insertados con éxito',
              });
            }
          });
        }
      }
    }
  );
};

export const putPersona = async(req: Request, resp: Response) => {
  const { id } = req.params; // ID de la persona a editar
  const { body } = req; // Datos actualizados

  connection.query('UPDATE USUARIOS SET ? WHERE CED_USU = ?', [body, id], (err, data) => {
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

export const reingresoPersona = async (req: Request, resp: Response) => {
  const { id } = req.params;
  try {
    connection.query('UPDATE USUARIOS SET ESTADO = ? WHERE CED_USU = ?', ['ACTIVO', id], async (updateErr, updateData) => {
      if (updateErr) {
        connection.rollback(() => {
          console.error('Error al editar la persona', updateErr);
          resp.status(500).json({
            error: 'Error al editar la persona',
          });
        });
        return;
      }
      resp.status(200).json({
        message: 'Persona actualizada correctamente',
      });
    });
  } catch (error) {
    console.error('Error al editar la persona', error);
    resp.status(500).json({
      error: 'Error al editar la persona',
    });
  }
};

export const eliminarPersona = async (req: Request, resp: Response) => {
  const { id } = req.params; // Cédula de la persona a editar

  connection.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del pool', err);
      resp.status(500).json({
        error: 'Error interno del servidor',
      });
      return;
    }

    connection.beginTransaction((beginErr) => {
      if (beginErr) {
        console.error('Error al iniciar la transacción', beginErr);
        connection.release(); // Liberar la conexión
        resp.status(500).json({
          error: 'Error interno del servidor',
        });
        return;
      }

      connection.query('UPDATE USUARIOS SET ESTADO = ? WHERE CED_USU = ?', ['PASIVO', id], (updateErr, updateData) => {
        if (updateErr) {
          connection.rollback(() => {
            console.error('Error al editar la persona', updateErr);
            connection.release(); // Liberar la conexión
            resp.status(500).json({
              error: 'Error al editar la persona',
            });
          });
          return;
        }

        // Resto de tu lógica para actualizar los medidores de esa persona
        connection.query('UPDATE MEDIDORES SET ESTADO = ? WHERE CED_USU_MED = ?', ['INACTIVO', id], (updateMedErr, updateMedData) => {
          if (updateMedErr) {
            connection.rollback(() => {
              console.error('Error al actualizar los medidores', updateMedErr);
              resp.status(500).json({
                error: 'Error al actualizar los medidores',
              });
            });
            return;
          }

          connection.commit((commitErr) => {
            if (commitErr) {
              connection.rollback(() => {
                console.error('Error al realizar el commit de la transacción', commitErr);
                connection.release(); // Liberar la conexión
                resp.status(500).json({
                  error: 'Error interno del servidor',
                });
              });
            } else {
              connection.release(); // Liberar la conexión
              resp.json({
                msg: 'Editada con éxito',
              });
            }
          });
        }); // Agregado el paréntesis de cierre aquí
      }); // Agregado el paréntesis de cierre aquí
    });
  });
};


