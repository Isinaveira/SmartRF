import { Component } from '@angular/core';
import { NavbarComponent } from '@/components/shared/navbar/navbar.component';
@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css'
})
export class DocumentationComponent {

}
