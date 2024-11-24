import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
