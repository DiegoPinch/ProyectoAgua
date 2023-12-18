import { Component, OnInit, ViewChild } from '@angular/core';
import { PDFNotificationService, PDFDocumentProxy } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'gst-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer: any; // Referencia al visor de PDF

  pdf: PDFDocumentProxy | undefined;
  pageNumber = 1;

  constructor(private notificationService: PDFNotificationService) {}

  ngOnInit(): void {
    this.pdfViewer.pdfLoadingComplete.subscribe(() => {
      // La carga del PDF se ha completado
      if (this.pdfViewer.pdfViewerApplication) {
        this.pdf = this.pdfViewer.pdfViewerApplication.pdfDocument;
        this.loadPage(this.pageNumber);
      }
    });
  }

  loadPage(pageNumber: number): void {
    if (this.pdf) {
      this.pdf.getPage(pageNumber).then((page) => {
        this.pdfViewer.pdfViewerApplication.pdfViewer.scrollPageIntoView({
          pageNumber: pageNumber,
        });
      });
    }
  }
}
