// src/app/conductor/conductor.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CONDUCTORES, PEDIDOS } from '../../data/data';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule para usar directivas como *ngFor y *ngIf
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  pedidos: Pedido[] = [];
  conductorName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Supongamos que el ID del conductor se pasa como parámetro de la ruta
    const conductorId = parseInt(this.route.snapshot.paramMap.get('conductorId')!, 10);
    console.log('Conductor ID:', conductorId); // Verifica que el ID se está obteniendo correctamente
    const conductor = CONDUCTORES.find(c => c.cedula === conductorId);

    if (conductor) {
      this.conductorName = conductor.nombre;
      this.pedidos = PEDIDOS.filter(p => p.conductor.cedula === conductorId);
      console.log('Conductor encontrado:', conductor); // Depuración para ver los datos del conductor
      console.log('Pedidos del conductor:', this.pedidos); // Verifica los pedidos asociados
    } else {
      console.warn('Conductor no encontrado');
    }
  }


  finalizarEntrega(pedido: Pedido): void {
    console.log(`Entrega finalizada para el pedido #${pedido.id}`);
  }

  reportarNovedad(pedido: Pedido): void {
    console.log(`Novedad reportada para el pedido #${pedido.id}`);
  }
}
