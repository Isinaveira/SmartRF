import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-constellation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './constellation-form.component.html',
  styleUrl: './constellation-form.component.css'
})
export class ConstellationFormComponent {
  formData = {
    name: '',
    devices_list: []
  };

  constructor(private dialogRef: MatDialogRef<ConstellationFormComponent>) { }

  onSubmit(): void {
    // Aquí puedes procesar el envío del formulario, por ejemplo, a través de un servicio
    console.log(this.formData);
    // Luego, cierra el modal
    this.dialogRef.close();
  }

  closeForm(): void {
    this.dialogRef.close();
  }

}