import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private API_URL = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  guardarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API_URL + '/api/pedidos/registroPedido', pedido,{
      headers: { 'Content-Type': 'application/json' },
    });
  }

  obtenerPedidosPendientes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/pendientes`);
  }

  asignarConductores(asignaciones: { pedidoId: number; conductorId: number }[]): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/asignarConductores`, asignaciones);
  }
}
