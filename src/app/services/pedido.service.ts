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
}
