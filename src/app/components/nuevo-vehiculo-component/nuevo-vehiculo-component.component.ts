import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VehiculoService } from '../../services/vehiculo.service';


@Component({
  selector: 'app-nuevo-vehiculo-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-vehiculo-component.component.html',
  styleUrl: './nuevo-vehiculo-component.component.css'
})
export class NuevoVehiculoComponentComponent {
  vehiculo = {
    id: 0,
    placa: '',
    marca: '',
    modelo: 0,
    cap_peso: 0,
  }

  constructor(
    private vehiculoService: VehiculoService, // Servicio para interactuar con el backend
    public dialogRef: MatDialogRef<NuevoVehiculoComponentComponent>
  ) {}

  guardarVehiculo() {
    this.vehiculoService.guardarVehiculo(this.vehiculo).subscribe({
      next: (response) => {
        console.log('Vehiculo guardado:', response);
        this.dialogRef.close(this.vehiculo); // Cerrar el diálogo y enviar los datos al componente padre
      },
      error: (err) => {
        console.error('Error al guardar el vehiculo:', err);
        alert('Hubo un error al guardar el vehiculo. Intente nuevamente.');
      },
    });
  }

}
