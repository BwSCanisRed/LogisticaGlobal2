import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private API_URL = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  guardarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.API_URL + '/api/vehiculos/registrarVehiculo', vehiculo,{
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
