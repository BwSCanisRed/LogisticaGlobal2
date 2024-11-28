import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private API_URL = 'https://logisticaglobalbackend-production.up.railway.app';

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

  asignarConductores(asignaciones: { pedidoId: number; conductorId: number }[]): Observable<void[]> {
    const requests = asignaciones.map(asignacion => {
      const url = `${this.API_URL}/api/pedidos/${asignacion.pedidoId}/asignarConductor`;
      return this.http.put<void>(url, null, {
        headers: { 'Content-Type': 'application/json' },
        params: { conductorId: asignacion.conductorId.toString() }
      });
    });

    // Ejecutar todas las peticiones HTTP en paralelo
    return forkJoin(requests);
  }

  getPedidoPorTracking(trackingNumber: string): Observable<Pedido> {
    const url = `${this.API_URL}/api/pedidos/tracking/${trackingNumber}`;
    return this.http.get<Pedido>(url);
  }


}
