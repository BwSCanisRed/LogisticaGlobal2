import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = 'https://logisticaglobalbackend-production.up.railway.app/auth/sign-in';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) {}

  /*login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap((response) => {
        if (response.jwt) {
          this.setToken(response.jwt);
          console.log('Token:', response.jwt);
        }
      })
    );
  }*/

    login(email: string, password: string): Observable<any> {
      console.log('URL de login:', this.LOGIN_URL);

      return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe( tap((response) => {
          console.log('Respuesta del servidor:', response); // Agrega este log

          if (response.jwt) {
            this.setToken(response.jwt);
            console.log('Token recibido:', response.jwt);
            localStorage.setItem('adminId', response.adminId);
            console.log('Token:', response.jwt, 'Admin ID:', response.adminId);
          } else {
            console.error('Token no encontrado en la respuesta');
          }
        })
      );
    }


  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = this.decodeToken(token);
    const exp = payload.exp * 1000; // Convertir segundos a milisegundos
    return Date.now() < exp;
  }

  getUserRole(): any | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const payload = this.decodeToken(token);
    return payload || null; // Asume que el JWT tiene un campo `role`
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}
