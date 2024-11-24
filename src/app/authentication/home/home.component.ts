import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class HomeComponent {
  email: string = '';
  password: string = '';
  trackingNumber: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const user = this.authService.getUserRole();
        if (user.rol === 'despachador') {
          this.router.navigate(['/admin',user.cedula]);

        } else if (user.rol === 'conductor') {
          this.router.navigate(['/conductor',user.cedula]);
        } else {
          alert('Rol desconocido, contacte al administrador');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Inicio de sesión fallido. Verifique sus credenciales.');
      },
    });
  }

  goToTracking(): void {
    // Lógica para tracking, asumiendo que obtendrás datos del backend
    // Esto depende de cómo esté estructurada tu API
    if (this.trackingNumber) {
      this.router.navigate(['/tracking', this.trackingNumber]);
    } else {
      alert('Por favor, ingrese un número de guía válido');
    }
  }
}
