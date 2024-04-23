import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ImageServiceService {
  constructor(private http: HttpClient) {}

  uploadImage(imageData: string, filename: string) {
    return this.http.post('http://localhost:3000/image', {
      imageData,
      filename,
    });
  }
}
