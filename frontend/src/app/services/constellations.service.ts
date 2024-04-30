import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constellation } from '@/models/constellation.model';

@Injectable({
  providedIn: 'root',
})
export class ConstellationsService {
  URL_CONSTELLATION: string = 'http://localhost:3000/constellations';
  URL_MEASUREMENTS: string = 'http://localhost:3000/measurements';
  constructor(private http: HttpClient) {}

  //obtener constelaciones
  getConstellations(): Observable<any> {
    return this.http.get(this.URL_CONSTELLATION);
  }
  //editar constelaciones
  createConstellations(constellation: Constellation): Observable<any> {
    return this.http.post(this.URL_CONSTELLATION, constellation);
  }
  getConstellation(constellation_id: string): Observable<any> {
    return this.http.get(this.URL_CONSTELLATION + '/' + constellation_id);
  }

  deleteConstellation(constellation_id: string): Observable<any> {
    return this.http.delete(this.URL_CONSTELLATION + '/' + constellation_id);
  }
  joinConstellation(constellation: Constellation){
    return this.http.post(this.URL_MEASUREMENTS + '/join', constellation);
  }
}
