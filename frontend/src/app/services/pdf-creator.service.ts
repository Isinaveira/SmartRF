import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { ImageService } from '@/services/image-to-base64.service';

@Injectable({
  providedIn: 'root',
})
export class PdfCreatorService {
  constructor(private imageService: ImageService) {}

  public generateReport(callback: () => void) {
    const imageUrl = 'assets/logo_pdf.png'; // Path to the image
    this.imageService.getImageBase64(imageUrl).subscribe((base64Image) => {
      const doc = new jsPDF();
      this.addFirstPage(doc, base64Image, () => {
        this.addAdditionalPages(doc);
        doc.save('detailed_report.pdf');
        callback();
      });
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
      doc.text('Page 1', 105, 290, { align: 'center' });
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
        title: 'Project Overview',
        text: 'Here is the project overview...',
        contentType: 'text',
      },
      {
        title: 'Graphs and Analysis',
        text: '',
        contentType: 'graphs',
        data: [
          /* some graph data */
        ],
      },
      {
        title: 'Conclusion',
        text: 'Final thoughts and conclusions on the findings.',
        contentType: 'text',
      },
    ];

    pagesData.forEach((page) => {
      doc.addPage();
      this.addDynamicPage(doc, page);
    });
  }

  private addDynamicPage(doc: jsPDF, pageData: any) {
    doc.setFontSize(18);
    doc.text(pageData.title, 105, 20, { align: 'center' });

    if (pageData.contentType === 'text') {
      doc.setFontSize(12);
      doc.text(pageData.text, 20, 40);
    } else if (pageData.contentType === 'graphs') {
      // Add graph drawing logic here
    }
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
