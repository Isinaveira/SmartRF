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
    const imageUrl = 'assets/logo_orange.png'; // Make sure the asset path is correct

    this.imageService.getImageBase64(imageUrl).subscribe((base64Image) => {
      const doc = new jsPDF();
      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        // Calculate the best fit dimensions while maintaining the aspect ratio
        const dimensions = this.calculateAspectRatioFit(
          img.width,
          img.height,
          60,
          30
        );

        // Add a title page
        doc.setFontSize(24);
        doc.text('SmartRF: Area study', 105, 80, { align: 'center' });

        // Calculate center position for the image
        const pageWidth = doc.internal.pageSize.getWidth();
        const x = pageWidth / 2 - dimensions.width / 2;
        const y = 120;

        // Add the image with calculated dimensions
        doc.addImage(
          base64Image,
          'PNG',
          x,
          y,
          dimensions.width,
          dimensions.height
        );

        // Add footer
        doc.setFontSize(12);
        doc.text('Page 1', 105, 290, { align: 'center' });

        // Copyright disclaimer
        doc.setFontSize(10);
        doc.text('Copyright © 2024 SmartRF. All rights reserved.', 105, 295, {
          align: 'center',
        });

        // Save the PDF
        doc.save('example.pdf');
      };
    });
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
