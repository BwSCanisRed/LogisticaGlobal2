import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from '../models/conductor';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  private API_URL = 'http://localhost:8090';
  constructor(private http: HttpClient) {}

  guardarConductor(conductor: any): Observable<any>{
    return this.http.post(`${this.API_URL}/api/conductor/registrarConductor`, conductor, {
      headers: { 'Content-Type': 'application/json' }, // Asegura que envías JSON
    });
  }

  obtenerConductores(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(`${this.API_URL}/api/conductor/mostrarConductor`);
  }
}
