import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_URL = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  guardarDespachador(admin: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/despachador/registroDespachador`, admin, {
      headers: { 'Content-Type': 'application/json' }, // Asegura que envías JSON
    });
  }

  buscarDespachadorPorCedula(adminId: any): Observable<any>{
    return this.http.get(`${this.API_URL}/api/despachador/buscarDespachadorPorCedula/${adminId}`);
  }

}
