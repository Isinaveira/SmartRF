import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@/models/user.model';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url de la API de usuarios
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Metodo para crear usuarios
  saveUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  // Editar un usuario
  editUser(dni: string, user: User): Observable<any> {
    return this.http.put(this.url + dni, user);
  }

  // Metodo para obtener usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  // Obtener un usuario, necesario para editar
  getUser(dni: string): Observable<any> {
    return this.http.get(this.url + dni);
  }

  // Metodo para borrar usuarios
  deleteUser(dni: string): Observable<any> {
    return this.http.delete(this.url + dni);
  }

}
