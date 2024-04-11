import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentation } from '@/models/Documentation';
@Injectable({
  providedIn: 'root'
})
export class DocumentationsService {

  private apiUrl = 'http://localhost:3000/documentations';

  constructor(private http: HttpClient) { }

  getAllDocumentation(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(this.apiUrl);
  }

  createDocumentation(documentation: Documentation): Observable<Documentation> {
    return this.http.post<Documentation>(this.apiUrl, documentation);
  }

  deleteDocumentation(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
