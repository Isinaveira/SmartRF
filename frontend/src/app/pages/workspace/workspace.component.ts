import { Component } from '@angular/core';
import { ReportComponent } from './report/report.component';
//import  jsPDF from 'jspdf';
//import  html2canvas from 'html2canvas';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [ReportComponent, NavbarComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {

  public isActive: boolean = false;

  constructor(){}

  visualizeReport(){

    this.isActive = true;
  }

  cancel(){
    this.isActive = false;
  }
  /*
  generateReport(){

    const DATA = document.getElementById('report');
    // Crear un nuevo documento PDF
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      
      // Añadir imagen Canvas a PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
      }).then((docResult) => {
      docResult.save('informe.pdf');
      });



  }
 */
}
