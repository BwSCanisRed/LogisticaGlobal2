import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-nuevo-pedido-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-pedido-component.component.html',
  styleUrls: ['./nuevo-pedido-component.component.css'],
})
export class NuevoPedidoComponentComponent {
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
    origen:'',
    destino:''
  }

  constructor(
    private pedidoService: PedidoService, // Servicio para interactuar con el backend
    public dialogRef: MatDialogRef<NuevoPedidoComponentComponent>
  ) { }

  guardarPedido() {
    this.pedidoService.guardarPedido(this.pedido).subscribe({
      next: (response) => {
        console.log('Pedido guardado:', response);
        this.dialogRef.close(this.pedido); // Cierra el diálogo y envía los datos al componente padre
      },
      error: (err) => {
        console.error('Error al guardar el pedido:', err);
        alert('Hubo un error al guardar el pedido. Intente nuevamente.');
      },
    });

  }
}
