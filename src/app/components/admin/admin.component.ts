import { Pedido } from './../../models/pedido';
// src/app/admin/admin.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Conductor } from '../../models/conductor';
import { AdminService } from '../../services/admin.service';
import { ConductorService } from '../../services/conductor.service';
import { PedidoService } from '../../services/pedido.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { NuevoAdminComponentComponent } from '../nuevo-admin-component/nuevo-admin-component.component';
import { NuevoConductorComponentComponent } from '../nuevo-conductor-component/nuevo-conductor-component.component';
import { NuevoPedidoComponentComponent } from '../nuevo-pedido-component/nuevo-pedido-component.component';
import { NuevoVehiculoComponentComponent } from '../nuevo-vehiculo-component/nuevo-vehiculo-component.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule]
})
export class AdminComponent  {
  pedidos: Pedido[] = []; // Declaración de los pedidos
  //conductores: Conductor[] = []; // Declaración de los conductores // Declaración del nombre del administrador
  //selectedDriver: Conductor | null = null;
  adminName: string = '';
  adminId: number | null = null;
  selectedDriver: Conductor | null = null;
  vehiculos: any[] = []; // Lista de vehículos
  conductores: Conductor[] = [];
  pedidosPendientes: Pedido[] = [];
  asignaciones: { pedidoId: number; conductorId: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService, // Inyectar el servicio
    private dialog: MatDialog, // Inyectar MatDialog
    private vehiculoService: VehiculoService,
    private conductorService: ConductorService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // Supongamos que el ID del administrador se pasa como parámetro de la ruta
    this.adminId = parseInt(this.route.snapshot.paramMap.get('adminId')!, 10);
    this.cargarPedidosPendientes();
    this.cargarConductores();

    if (this.adminId) {
      this.adminService.buscarDespachadorPorCedula(this.adminId).subscribe({
        next: (admin) => {
          this.adminName = admin.nombre;
          this.cargarPedidosPendientes();
          this.cargarConductores();
          console.log('Admin encontrado:', admin);

          // Filtrar los pedidos que están en bodega
      //this.pedidos = PEDIDOS.filter(p => p.estado === 'En bodega');

      // Asignar todos los conductores
      //this.conductores = CONDUCTORES;
        },
        error: (err) => {
          console.error('Error al obtener el administrador:', err);
        },
      });
    } else {
      console.error('Administrador no encontrado');
    }

    //cargar pedidos

  }

  abrirModalAdmin(): void {
    const dialogRef = this.dialog.open(NuevoAdminComponentComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Nuevo Administrador:', result);
      }
    });
  }

  abrirModalVehiculo() {
    const dialogRef = this.dialog.open(NuevoVehiculoComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo Vehículo:', result);
      }
    });
  }

  abrirModalConductor() {
    const dialogRef = this.dialog.open(NuevoConductorComponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.vehiculo = 0;
        result.pedidos = [];
        console.log('Nuevo Conductor:', result);
      }
    });
  }

  abrirModalPedido() {
    const dialogRef = this.dialog.open(NuevoPedidoComponentComponent, {
      data: { adminId: this.adminId }, // Pasamos adminId como data al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuevo Pedido:', result);
      }
    });
  }


    asignarPedido(): void {
    if (this.selectedDriver) {
      console.log(`Asignando pedido al conductor: ${this.selectedDriver.nombre}`);
      // Lógica para asignar el pedido al conductor seleccionado
    } else {
      console.error('No se ha seleccionado ningún conductor');
    }
  }

  cargarPedidosPendientes(): void {
    if (this.adminId) {
      this.pedidoService.obtenerPedidosPorAdmin(this.adminId).subscribe({
        next: (pedidos) => {
          // Filtrar pedidos pendientes (sin conductorId asignado)
          this.pedidosPendientes = pedidos.filter((pedido) => !pedido.conductor);
          console.log('Pedidos pendientes:', this.pedidosPendientes);
        },
        error: (error) => {
          console.error('Error al cargar pedidos pendientes:', error);
        },
      });
    }
  }


  cargarConductores(): void {
    this.conductorService.obtenerConductores().subscribe({
      next: (conductores) => {
        this.conductores = conductores;
      },
      error: (error) => {
        console.error('Error al cargar conductores:', error);
      }
    });
  }

  asignarConductores(): void {
    if (this.asignaciones.length > 0) {
      this.pedidoService.asignarConductores(this.asignaciones).subscribe({
        next: () => {
          console.log('Conductores asignados exitosamente');
          this.cargarPedidosPendientes(); // Recargar pedidos pendientes
        },
        error: (error) => {
          console.error('Error al asignar conductores:', error);
        }
      });
    } else {
      console.warn('No hay asignaciones para procesar.');
    }
  }

  agregarAsignacion(pedidoId: number, conductorId: number): void {
    const existeAsignacion = this.asignaciones.some(
      (asignacion) => asignacion.pedidoId === pedidoId
    );

    if (existeAsignacion) {
      console.warn(`El pedido ${pedidoId} ya tiene un conductor asignado.`);
      return;
    }

    this.asignaciones.push({ pedidoId, conductorId: +conductorId }); // Cast a número.
    console.log('Asignación agregada:', this.asignaciones);
  }

  obtenerValorSelect(event: Event): number {
    const target = event.target as HTMLSelectElement;
    return parseInt(target.value, 10); // Convertir el valor a número
  }

}
