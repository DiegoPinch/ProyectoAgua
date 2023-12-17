"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarFactura = void 0;
var pdfkit_1 = __importDefault(require("pdfkit"));
var connection_1 = __importDefault(require("../db/connection"));
var generarFactura = function (req, res) {
    var cedulaUsuario = req.params.cedulaUsuario;
    var mes = req.params.mes;
    var tipo = req.params.tipo;
    var sqlQuery = "\n        SELECT U.*, M.*, L.*, F.*\n        FROM usuarios U, medidores M, lecturas L, facturas F\n        WHERE U.CED_USU = M.CED_USU_MED\n        AND M.ID_MED = L.ID_MED_LEC\n        AND L.ID_LEC = F.ID_LEC_PER\n        AND F.EST_FACT= 'PAGADO'\n        AND U.CED_USU = ?\n        AND L.MES_CON = ?\n        AND M.TIPO_MED = ?\n        \n    ";
    connection_1.default.query(sqlQuery, [cedulaUsuario, mes, tipo], function (error, results) {
        if (error) {
            console.error('Error en la consulta SQL: ' + error.message);
            return res.status(500).send('Error al generar la factura');
        }
        // Comprobar que los resultados son válidos
        if (results.length === 0) {
            return res.status(500).send('Los datos de la factura están vacíos');
        }
        // Crear un nuevo documento PDF con un tamaño de página personalizado
        var doc = new pdfkit_1.default({ size: [200, 300] });
        doc.pipe(res);
        // Tamaño de fuente y márgenes adecuados
        var fontSize = 5;
        var marginLeft = 10;
        var marginTop = 10;
        // Dibujar la información de la empresa
        doc
            .fontSize(fontSize)
            .text('                                 NOMBRE EMPRESA', marginLeft, marginTop)
            .text('Dirección de la Empresa', marginLeft, marginTop + fontSize)
            .text('RUC de la Empresa', marginLeft, marginTop + 2 * fontSize);
        // Ajustar la posición vertical de la tabla
        var tableTop = marginTop + 4 * fontSize;
        var table = {
            headers: ['DESCRIPCION', 'MES', 'LEC. ANT', 'LEC. ACT', 'EXCESO', 'VALOR', 'ESTADO'],
            items: results.map(function (row) { return [
                row.TIPO_MED,
                row.MES_CON,
                row.LEC_ANT,
                row.LEC_ACT,
                row.EXC_LECTURA,
                row.SUM_TOTAL,
                row.EST_FACT
            ]; }),
        };
        var columnWidth = 28;
        var rowHeight = 10;
        // Dibujar los encabezados de la tabla primero
        table.headers.forEach(function (header, i) {
            doc
                .fontSize(3.5)
                .text(header, marginLeft + i * columnWidth, tableTop, { width: columnWidth, align: 'left' });
        });
        // Dibujar el contenido de la tabla
        table.items.forEach(function (row, rowIndex) {
            row.forEach(function (cell, cellIndex) {
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
        var valorTotal = results.reduce(function (total, row) { return total + row.SUM_TOTAL; }, 0);
        doc
            .fontSize(4)
            .text("-----------------------------------------------------------------------------------------------------------------------------------------", marginLeft, tableTop + (table.items.length + 1) * rowHeight, { width: columnWidth * 6, align: 'left' });
        // Mostrar el valor total debajo de la última fila de la tabla
        doc
            .fontSize(4)
            .text('Valor Total', marginLeft, tableTop + (table.items.length + 2) * rowHeight, { width: columnWidth, align: 'left' })
            .text("".concat(valorTotal.toFixed(2), " ").concat('$'), marginLeft + 4.9 * columnWidth, tableTop + (table.items.length + 2) * rowHeight, { width: columnWidth, align: 'left' });
        var cliente = results[0]; // Suponiendo que los detalles del cliente están en la primera fila de resultados
        doc
            .fontSize(4)
            .text("----------------------------------------------------------------------------------------------------------------------------------------", marginLeft, tableTop + (table.items.length + 3) * rowHeight, { width: columnWidth * 6, align: 'left' });
        doc
            .fontSize(4)
            .text("Cliente: ".concat(cliente.NOM_USU, " ").concat(cliente.APE_USU), marginLeft, tableTop + (table.items.length + 4) * rowHeight, { width: columnWidth * 4, align: 'left' });
        // Finalizar y enviar el PDF al cliente
        doc.end();
    });
};
exports.generarFactura = generarFactura;
