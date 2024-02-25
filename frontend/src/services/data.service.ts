
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  guardarDatos(datos: any) {
    return this.http.post<any>('/api/guardar-datos', datos);
  }
}
