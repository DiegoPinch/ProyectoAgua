import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import connection from '../db/connection';

export const generarFactura = (req: Request, res: Response) => {
    
    const cedulaUsuario = req.params.cedulaUsuario;
    const mes = req.params.mes;
    const tipo = req.params.tipo;
    const sqlQuery = `
        SELECT U.*, M.*, L.*, F.*
        FROM usuarios U, medidores M, lecturas L, facturas F
        WHERE U.CED_USU = M.CED_USU_MED
        AND M.ID_MED = L.ID_MED_LEC
        AND L.ID_LEC = F.ID_LEC_PER
        AND F.EST_FACT= 'PAGADO'
        AND U.CED_USU = ?
        AND L.MES_CON = ?
        AND M.TIPO_MED = ?
        
    `;
    connection.query(sqlQuery, [cedulaUsuario, mes, tipo], (error, results) => {
        if (error) {
            console.error('Error en la consulta SQL: ' + error.message);
            return res.status(500).send('Error al generar la factura');
        }

        // Comprobar que los resultados son válidos
        if (results.length === 0) {
            return res.status(500).send('Los datos de la factura están vacíos');
        }

        // Crear un nuevo documento PDF con un tamaño de página personalizado
        const doc = new PDFDocument({ size: [200, 300] });

        doc.pipe(res);

        // Tamaño de fuente y márgenes adecuados
        const fontSize = 5;
        const marginLeft = 10;
        const marginTop = 10;

        // Dibujar la información de la empresa
        doc
            .fontSize(fontSize)
            .text('                                 NOMBRE EMPRESA', marginLeft, marginTop)
            .text('Dirección de la Empresa', marginLeft, marginTop + fontSize)
            .text('RUC de la Empresa', marginLeft, marginTop + 2 * fontSize);

        // Ajustar la posición vertical de la tabla
        const tableTop = marginTop + 4 * fontSize;

        const table = {
            headers: ['DESCRIPCION', 'MES','LEC. ANT','LEC. ACT', 'EXCESO','VALOR','ESTADO'],
            items: results.map((row: any) => [
                row.TIPO_MED,
                row.MES_CON,
                row.LEC_ANT,
                row.LEC_ACT,
                row.EXC_LECTURA,
                row.SUM_TOTAL,
                row.EST_FACT
            ]),
        };

        const columnWidth = 28;
        const rowHeight = 10;
        
        // Dibujar los encabezados de la tabla primero
        table.headers.forEach((header, i) => {
            doc
                .fontSize(3.5)
                .text(header, marginLeft + i * columnWidth, tableTop, { width: columnWidth, align: 'left' });
        });

        // Dibujar el contenido de la tabla
        table.items.forEach((row: string[], rowIndex: number) => {
            row.forEach((cell: string, cellIndex) => {
                doc
                    .fontSize(3.5)
                    .text(cell, marginLeft + cellIndex * columnWidth, tableTop + (rowIndex + 1) * rowHeight, {
                        width: columnWidth,
                        align: 'left',
                    });
            });

        });

        // Calcular el valor total sumando la columna "valor"
        // Calcular el valor total sumando la columna "valor"
        const valorTotal: number = results.reduce((total: number, row: any) => total + row.SUM_TOTAL, 0);

        doc
            .fontSize(4)
            .text(`-----------------------------------------------------------------------------------------------------------------------------------------`,
             marginLeft, tableTop + (table.items.length + 1) * rowHeight, 
             { width: columnWidth * 6, align: 'left' });
        // Mostrar el valor total debajo de la última fila de la tabla
        doc
            .fontSize(4)
            .text('Valor Total', marginLeft, tableTop + (table.items.length + 2) * rowHeight, { width: columnWidth, align: 'left' })
            .text(`${valorTotal.toFixed(2)} ${'$'}`, marginLeft + 4.9 * columnWidth, tableTop + (table.items.length + 2) * rowHeight, { width: columnWidth, align: 'left' });
        const cliente = results[0]; // Suponiendo que los detalles del cliente están en la primera fila de resultados

        doc
            .fontSize(4)
            .text(`----------------------------------------------------------------------------------------------------------------------------------------`,
             marginLeft, tableTop + (table.items.length + 3) * rowHeight, 
             { width: columnWidth * 6, align: 'left' });

        doc
            .fontSize(4)
            .text(`Cliente: ${cliente.NOM_USU} ${cliente.APE_USU}`, marginLeft, tableTop + (table.items.length + 4) * rowHeight, { width: columnWidth * 4, align: 'left' });

        // Finalizar y enviar el PDF al cliente

        doc.end();
    });
};
