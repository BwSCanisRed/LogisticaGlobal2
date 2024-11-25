import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-nuevo-conductor-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-conductor-component.component.html',
  styleUrl: './nuevo-conductor-component.component.css'
})
export class NuevoConductorComponentComponent {
    conductor = {
    cedula: 0,
    nombre: '',
    licencia: 0,
    zona: '',
    correo: '',
    contrasena: '',
    vehiculoId: null
  }
  vehiculos: any[] = []; // Lista de vehículos disponibles

  constructor(
    private conductorService: ConductorService, // Servicio para interactuar con el backend
    private vehiculoService: VehiculoService, // Servicio para obtener los vehículos
    public dialogRef: MatDialogRef<NuevoConductorComponentComponent>
  ) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculoService.obtenerVehiculos().subscribe({
      next: (response) => {
        this.vehiculos = response; // Asigna los vehículos obtenidos
        console.log('Vehículos disponibles:', this.vehiculos);
      },
      error: (err) => {
        console.error('Error al cargar los vehículos:', err);
        alert('No se pudieron cargar los vehículos. Intente más tarde.');
      },
    });
  }

  guardarConductor() {
    const conductorConVehiculo = {
      ...this.conductor,
      vehiculo: { id: this.conductor.vehiculoId }, // Aquí creas un objeto con el ID del vehículo
    };

    this.conductorService.guardarConductor(conductorConVehiculo).subscribe({
      next: (response) => {
        console.log('Conductor guardado:', response);
        this.dialogRef.close(this.conductor); // Cerrar el diálogo
      },
      error: (err) => {
        console.error('Error al guardar el conductor:', err);
        alert('Hubo un error al guardar el conductor. Intente nuevamente.');
      },
    });
  }
}

