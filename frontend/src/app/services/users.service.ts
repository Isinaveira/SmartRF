import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '@/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  user! : User;
  url = "http://localhost:3000/users"
  constructor(private http: HttpClient) {

   }

   


  
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
