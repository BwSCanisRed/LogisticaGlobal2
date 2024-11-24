import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-nuevo-admin-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-admin-component.component.html',
  styleUrl: './nuevo-admin-component.component.css'
})
export class NuevoAdminComponentComponent {
    admin = {
    cedula: 0,
    bodega: '',
    nombre: '',
    correo: '',
    contrasena: ''
  }
  constructor(
    private adminService: AdminService, // Servicio para interactuar con el backend
    public dialogRef: MatDialogRef<NuevoAdminComponentComponent>
  ) {}


guardarAdmin(): void {
  this.adminService.guardarDespachador(this.admin).subscribe({
    next: (response) => {
      console.log('Administrador guardado:', response);
      this.dialogRef.close(this.admin); // Cerrar el diálogo y enviar los datos al componente padre
    },
    error: (err) => {
      console.error('Error al guardar el administrador:', err);
      alert('Hubo un error al guardar el administrador. Intente nuevamente.');
    },
  });
  }
}
