import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constellation } from '@/models/constellation.model';

@Injectable({
  providedIn: 'root'
})
export class ConstellationsService {
  url: string = 'http://localhost:3000/constellations'
  constructor(private http: HttpClient) { }

  //obtener constelaciones
  getConstellations(): Observable<any> {
    return this.http.get(this.url);
  }
  //editar constelaciones
  createConstellations(constellation:any): Observable<any> {
    return this.http.post(this.url, constellation);
  }
  getConstellation(constellation_id: any): Observable<any> {
    return this.http.post(this.url, constellation_id);
  }
  deleteConstellations(constellation_id: any): Observable <any>{
    return this.http.delete(this.url, constellation_id);
  }
  
}
