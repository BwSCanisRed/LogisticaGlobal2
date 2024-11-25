import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Admin } from '../../models/admin';
import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';


@Component({
  selector: 'app-nuevo-pedido-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-pedido-component.component.html',
  styleUrls: ['./nuevo-pedido-component.component.css'],
})
export class NuevoPedidoComponentComponent implements OnInit {
  pedido = {
    id: 0,
    direccion: '',
    localidad: '',
    cd_postal: 0,
    ciudad: '',
    ct_paquetes: 0,
    estado: 'Bodega',
    fechaBodega: null,
    fechaTransito: null,
    fechaEntregado: null,
    foto: '',
    novedad: '',
    origen: '',
    destino: '',
    adminId: null// Agregamos el campo admin para asociar el administrador al pedido
  };

  constructor(
    private pedidoService: PedidoService, // Servicio para interactuar con el backend
    public dialogRef: MatDialogRef<NuevoPedidoComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { adminId: number }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.adminId) {
      this.pedido.adminId = this.data.adminId; // Asignamos adminId al pedido
      console.log(`Admin ID asignado al pedi  do: ${this.pedido.adminId}`);
    } else {
      console.error('No se pudo obtener el adminId del administrador.');
      alert('Error: No se pudo identificar al administrador. Verifique su sesión.');
    }
  }


  guardarPedido(): void {
    if (!this.pedido.adminId) {
      alert('No se puede guardar el pedido porque no se ha asociado un administrador.');
      return;
    }

    // Crear un objeto `admin` con las propiedades necesarias
    const admin: Admin = {
      cedula: this.pedido.adminId,
      bodega: '', // Valores predeterminados
      nombre: '',
      correo: '',
      contrasena: '',
    };

    // Crear el objeto `Pedido` completo
    const pedidoPayload: Pedido = {
      ...this.pedido,
      admin, // Asignamos el objeto admin completo
    };

    this.pedidoService.guardarPedido(pedidoPayload).subscribe({
      next: (response) => {
        console.log('Pedido guardado:', response);
        alert('Pedido creado exitosamente');
        this.dialogRef.close(this.pedido); // Cierra el diálogo y envía los datos al componente padre
      },
      error: (err) => {
        console.error('Error al guardar el pedido:', err);
        alert('Hubo un error al guardar el pedido. Intente nuevamente.');
      },
    });
  }
}
