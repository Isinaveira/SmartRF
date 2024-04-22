import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ImageService } from '@/services/image-to-base64.service';
import { UsersService } from '@/services/users.service';
import { CookieService } from 'ngx-cookie-service';

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
  public generateReport(callback: () => void) {
    this.dni = this.cookieService.get('dniCookie');
    this.numPage = 1;
    const fechaActual = new Date();

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
        title: 'User Data',
        text: 'Here we will have the user data',
        contentType: 'text',
      },
      {
        title: 'Measurement information',
        text: 'Here we will have the general measurement information',
        contentType: 'text',
        data: [
          /* some graph data */
        ],
      },
      {
        title: 'Samples information',
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
      // Basic user data page formatting
      if (pageData.title === 'User Data') {
        this.formatUserDataPage(doc, pageData);
      } else {
        doc.setFontSize(12);
        doc.text(pageData.text, 20, 40);
      }
    } else if (pageData.contentType === 'graphs') {
      // Add graph drawing logic here
    }

    doc.setFontSize(12);
    doc.text('Page ' + this.numPage, 105, 290, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Copyright © 2024 SmartRF. All rights reserved.', 105, 295, {
      align: 'center',
    });
  }

  private formatUserDataPage(doc: jsPDF, pageData: any) {
    const tableColumn = ['Field', 'Data'];
    const tableRows = [];

    // Push each user data into the table rows array
    tableRows.push(['Name', this.name]);
    tableRows.push(['Role', this.role]);
    tableRows.push(['Email', this.email]);
    tableRows.push(['Department', this.department]);

    // Draw table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40, // specify the Y position to start the table
      theme: 'striped',
      styles: { font: 'helvetica', fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }, // choose a color theme
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 'auto' },
      },
      didDrawPage: function (data) {
        doc.text(pageData.title, 105, 20, { align: 'center' });
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
