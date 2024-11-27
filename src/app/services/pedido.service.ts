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

  obtenerPedidosPendientes(adminId:number): Observable<Pedido[]> {

    return this.http.get<Pedido[]>(`${this.API_URL}/pendientes`);
  }

  obtenerPedidosPorAdmin(adminId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API_URL}/api/pedidos/admin/${adminId}`);
  }

  asignarConductores(asignaciones: { pedidoId: number; conductorId: number }[]): Observable<void> {
    const url = `${this.API_URL}/api/pedidos/asignarConductores`;
    return this.http.post<void>(url, asignaciones, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

}
