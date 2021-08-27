import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Obtener informacion del cuestionario
  obtenerCuestionario(id: number) {
    return this.http.get(`http://localhost:3003/cuestionario/${id}`).toPromise();
  }
}
