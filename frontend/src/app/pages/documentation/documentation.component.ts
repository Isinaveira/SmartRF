import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { Documentation } from '@/models/Documentation';
import { DocumentationsService } from '@/services/documentations.service';
@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css'
})
export class DocumentationComponent implements OnInit {

  documentations!: Documentation[];

  constructor(private router: Router, private documentationService: DocumentationsService){}


  ngOnInit(): void {
    this.documentationService.getAllDocumentation().subscribe({
      next: (documentations: Documentation[]) => {
        this.documentations = documentations
        console.log(this.documentations);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

}
