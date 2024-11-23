// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADMIN, CONDUCTORES, PEDIDOS } from '../../data/data';
import { Conductor } from '../../models/conductor';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  pedidos: Pedido[] = []; // Declaración de los pedidos
  conductores: Conductor[] = []; // Declaración de los conductores
  adminName: string = ''; // Declaración del nombre del administrador

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Supongamos que el ID del administrador se pasa como parámetro de la ruta
    const adminId = parseInt(this.route.snapshot.paramMap.get('adminId')!, 10);
    const admin = ADMIN.find(a => a.cedula === adminId);

    if (admin) {
      this.adminName = admin.nombre;

      // Filtrar los pedidos que están en bodega
      this.pedidos = PEDIDOS.filter(p => p.estado === 'En bodega');

      // Asignar todos los conductores
      this.conductores = CONDUCTORES;
    } else {
      console.error('Administrador no encontrado');
    }
  }
}
