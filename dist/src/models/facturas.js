"use strict";
var fs = require('fs');
var PDFDocument = require('pdfkit');
// Crear un documento PDF
var doc = new PDFDocument();
// Pipe el PDF a un archivo
var stream = fs.createWriteStream('reporte.pdf');
doc.pipe(stream);
// Contenido del PDF
doc.fontSize(24).text('Reporte PDF con pdfkit y TypeScript', 100, 100);
// Agregar más contenido según tus necesidades
// Finalizar el documento
doc.end();
stream.on('finish', function () {
    console.log('El reporte PDF se ha creado correctamente.');
});
