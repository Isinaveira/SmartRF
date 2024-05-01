import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MeasurementsService } from '@/services/measurements.service';

import { ImageService } from '@/services/image-to-base64.service';
import { UsersService } from '@/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Measurement } from '@/models/measurement.model';
import { Session } from '@/models/session.model';

@Injectable({
  providedIn: 'root',
})
export class PdfCreatorService {
  constructor(
    private imageService: ImageService,
    private userService: UsersService,
    private cookieService: CookieService
  ) {}
  currentDate!: string;
  name!: string;
  dni!: string;
  numPage: number = 1;
  role!: string;
  department!: string;
  email!: string;
  doc = new jsPDF();
  measurement!: Measurement;
  sample!: Session[];
  public generateReport(m: Measurement, s: Session[], callback: () => void) {
    this.doc = new jsPDF();
    this.measurement = m;
    this.dni = this.cookieService.get('dniCookie');
    this.numPage = 1;
    const fechaActual = new Date();
    this.sample = s;
    this.currentDate = fechaActual.toLocaleString('es-Es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Usar formato de 24 horas
    });
    this.userService.getUser(this.dni).subscribe({
      next: (data) => {
        this.name = data.name;
        this.role = data.role;
        this.email = data.email;
        this.department = data.department;
        const imageUrl = 'assets/logo_pdf.png'; // Path to the image
        this.imageService.getImageBase64(imageUrl).subscribe((base64Image) => {
          this.addFirstPage(this.doc, base64Image, () => {
            this.addAdditionalPages(this.doc);
            this.doc.save('detailed_report.pdf');
            callback();
          });
        });
      },
    });
  }

  private addFirstPage(doc: jsPDF, base64Image: string, callback: () => void) {
    const img = new Image();
    img.src = base64Image;
    img.onload = () => {
      const dimensions = this.calculateAspectRatioFit(
        img.width,
        img.height,
        240,
        120
      );
      const pageWidth = doc.internal.pageSize.getWidth();
      const x = pageWidth / 2 - dimensions.width / 2;
      const y = 100;
      doc.addImage(
        base64Image,
        'PNG',
        x,
        y,
        dimensions.width,
        dimensions.height
      );
      doc.setFontSize(24);
      doc.text('SmartRF: Area study', 105, 40, { align: 'center' });
      doc.setFontSize(12);
      doc.text('Page ' + this.numPage, 105, 290, { align: 'center' });
      doc.setFontSize(10);
      doc.text('Copyright © 2024 SmartRF. All rights reserved.', 105, 295, {
        align: 'center',
      });

      callback();
    };
  }

  private addAdditionalPages(doc: jsPDF) {
    const pagesData = [
      {
        title: 'Informacion Usuario',
        text: '',
        contentType: 'text',
      },
      {
        title: 'Informacion Medición',
        text: '',
        contentType: 'text',
        data: [
          /* some graph data */
        ],
      },
      {
        title: 'Muestras',
        text: 'Here we will have the general samples information',
        contentType: 'text',
        data: [
          /* some graph data */
        ],
      },
    ];

    pagesData.forEach((page) => {
      this.numPage++;
      doc.addPage();
      this.addDynamicPage(doc, page);
    });
  }

  private addDynamicPage(doc: jsPDF, pageData: any) {
    doc.setFontSize(18);
    doc.text(pageData.title, 105, 20, { align: 'center' });

    if (pageData.contentType === 'text') {
      switch (pageData.title) {
        case 'Informacion Usuario':
          this.formatUserDataPage(doc, pageData);
          break;
        case 'Informacion Medición':
          this.formatMeasurementDataPage(doc, pageData);
          break;
        case 'Muestras':
          this.formatSamplesDataPage(doc, pageData); // Assuming data is needed here
          break;
        default:
          console.warn('Unhandled page title:', pageData.title);
          doc.setFontSize(12);
          doc.text('Content not available', 20, 40);
          break;
      }
    }

    doc.setFontSize(12);
    doc.text('Page ' + this.numPage, 105, 290, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Copyright © 2024 SmartRF. All rights reserved.', 105, 295, {
      align: 'center',
    });
  }

  private formatUserDataPage(doc: jsPDF, pageData: any) {
    const tableColumn = ['Campos', 'Datos'];
    const tableRows = [];

    // Push each user data into the table rows array
    tableRows.push(['Nombre', this.name]);
    tableRows.push(['Rol', this.role]);
    tableRows.push(['Email', this.email]);
    tableRows.push(['Departamento', this.department]);
    tableRows.push(['Fecha expeditado', this.currentDate]);

    // Draw table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40, // specify the Y position to start the table
      theme: 'striped',
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], fontStyle: 'bold' }, // choose a color theme
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 'auto', fontStyle: 'italic' },
      },
      alternateRowStyles: { fillColor: [220, 220, 220] },
      didDrawPage: function (data) {
        doc.text(pageData.title, 105, 20, { align: 'center' });
      },
    });
  }
  private formatMeasurementDataPage(doc: jsPDF, pageData: any) {
    const tableColumn = ['Campo', 'Dato'];
    const tableRows = [];
    const formatValue = (value: any) =>
      typeof value === 'undefined' ? 'N/A' : value;
    // Push each measurement data into the table rows array
    tableRows.push(['Nombre (name)', this.measurement.name]);
    tableRows.push(['ID', this.measurement._id]);
    tableRows.push([
      'Ancho de banda del canal (chanBW)',
      `${this.measurement.chanBW} MHz`,
    ]);
    tableRows.push([
      'Frecuencia inicial (freqIni)',
      `${this.measurement.freqIni} MHz`,
    ]);
    tableRows.push([
      'Frecuencia final (freqFinal)',
      `${this.measurement.freqFinal} MHz`,
    ]);

    tableRows.push(['Modo (mode)', this.measurement.mode]);

    tableRows.push(['FFT Points (nfft)', this.measurement.nfft]);
    tableRows.push(['Inicio (startedAt)', this.measurement.startedAt]);
    tableRows.push(['Final (finishedAt)', this.currentDate]);
    tableRows.push([
      'Tiempo de captura (t_capt)',
      `${this.measurement.t_capt} s`,
    ]);
    tableRows.push([
      'Umbral (threshold)',
      formatValue(this.measurement.threshold),
    ]);

    // Draw table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40, // specify the Y position to start the table
      theme: 'striped',
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], fontStyle: 'bold' }, // choose a color theme
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
        1: { cellWidth: 'auto', fontStyle: 'italic' },
      },
      alternateRowStyles: { fillColor: [220, 220, 220] },
      didDrawPage: function (data) {
        doc.text(pageData.title, 105, 20, { align: 'center' });
      },
    });
  }
  private formatSamplesDataPage(doc: jsPDF, pageData: any) {
    const tableColumn = [
      'Measurement ID',
      'Device ID',
      'Date',
      'Results',
      'Threshold',
    ];
    const tableRows: string[][] = []; // Explicitly defining the type of the tableRows as an array of arrays of strings.

    // Populate table rows with session data
    this.sample.forEach((session: Session) => {
      tableRows.push([
        session.measurement_id,
        session.id_device,
        session.date,
        session.results,
        session.threshold,
      ]);
    });

    // Draw table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'striped',
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 'auto', fontStyle: 'bold' },
        1: { cellWidth: 'auto', fontStyle: 'bold' },
        2: { cellWidth: 'auto', fontStyle: 'bold' },
        3: { cellWidth: 'auto', fontStyle: 'italic' },
        4: { cellWidth: 'auto', fontStyle: 'italic' },
      },
      alternateRowStyles: { fillColor: [220, 220, 220] },
      didDrawPage: (data) => {
        // Center-align title at the top of every page
        doc.text(pageData.title, 105, 20, { align: 'center' });

        // Add footer at the bottom of every page
        const pageCount = doc.internal.pages.length; // Correct way to get page count
        doc.setFontSize(10);
        doc.text('Page ' + pageCount, 105, 290, { align: 'center' });
        doc.text('Copyright © 2024 SmartRF. All rights reserved.', 105, 295, {
          align: 'center',
        });
      },
    });
  }

  private calculateAspectRatioFit(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio,
    };
  }
}
