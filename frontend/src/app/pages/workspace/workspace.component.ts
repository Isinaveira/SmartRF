import { Component } from '@angular/core';
import { ReportComponent } from './report/report.component';
import jsPDF from 'jspdf';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { PdfCreatorService } from '@/services/pdf-creator.service';
@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ReportComponent, NavbarComponent],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'], // Corrected from styleUrl to styleUrls
})
export class WorkspaceComponent {
  constructor(private pdfCreator: PdfCreatorService) {}
  generateReport() {
    this.pdfCreator.generateReport(() => {
      console.log('Report generation completed!');
    });
  }
}
