import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';

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
    contrasena: ''
  }
  constructor(
    private conductorService: ConductorService, // Servicio para interactuar con el backend
    public dialogRef: MatDialogRef<NuevoConductorComponentComponent>
  ) {}

  guardarConductor() {
    this.conductorService.guardarConductor(this.conductor).subscribe({
      next: (response) => {
        console.log('Conductor guardado:', response);
        this.dialogRef.close(this.conductor); // Cerrar el diálogo y enviar los datos al componente padre
      },
      error: (err) => {
        console.error('Error al guardar el conductor:', err);
        alert('Hubo un error al guardar el conductor. Intente nuevamente.');
      },
    });
  }
}

