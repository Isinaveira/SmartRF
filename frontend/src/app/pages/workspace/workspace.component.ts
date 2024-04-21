import { Component } from '@angular/core';
import { ReportComponent } from './report/report.component';
import jsPDF from 'jspdf';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { ImageService } from '@/services/image-to-base64.service'; // Make sure this path is correct

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ReportComponent, NavbarComponent],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'], // Corrected from styleUrl to styleUrls
})
export class WorkspaceComponent {
  constructor(private imageService: ImageService) {}

  generateReport() {
    const imageUrl = 'assets/logo_pdf.png'; // Path to the image
    this.imageService.getImageBase64(imageUrl).subscribe((base64Image) => {
      const doc = new jsPDF();

      // Load the first page with image
      this.addFirstPage(doc, base64Image, () => {
        // After the first page is added and the image is loaded:
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

        // Add additional pages
        pagesData.forEach((page) => {
          doc.addPage();
          this.addDynamicPage(doc, page);
        });

        // Save the PDF after all pages are added
        doc.save('detailed_report.pdf');
      });
    });
  }

  addFirstPage(doc: jsPDF, base64Image: string, callback: () => void) {
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

      // Callback to continue processing
      callback();
    };
  }

  addDynamicPage(doc: jsPDF, pageData: any) {
    doc.setFontSize(18);
    doc.text(pageData.title, 105, 20, { align: 'center' });

    if (pageData.contentType === 'text') {
      doc.setFontSize(12);
      doc.text(pageData.text, 20, 40);
    } else if (pageData.contentType === 'graphs') {
      // Here, you would add graph drawing logic based on the data
      // Example: doc.addImage(graphImage, 'PNG', x, y, width, height);
    }
  }

  calculateAspectRatioFit(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio, // ensure the units are correct, might need conversion to mm if necessary
      height: srcHeight * ratio, // ensure the units are correct, might need conversion to mm if necessary
    };
  }
}
