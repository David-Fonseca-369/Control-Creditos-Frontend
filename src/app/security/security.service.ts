import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUsuarioDTO, RespuestaAutenticacionDTO } from './security';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private readonly llaveToken = 'asdftkn';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveNombre = 'nombre';
  private readonly llaveApellidoPaterno = 'apellidoPaterno';
  private readonly llaveApellidoMaterno = 'apellidoMaterno';

  private readonly campoRol = 'rol';
  private apiURL = environment.apiURL + 'login';

  constructor(private httpClient: HttpClient, private router: Router) {}

  public estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken); //traigo el token del localStorage.

    if (!token) {
      return false; //si no hay token no está logeado
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion); //si hay token, entonces traigo la expiración.
    const expiracionFecha = new Date(expiracion); //convierto la expoeracion a fecha

    if (expiracionFecha <= new Date()) {
      //verifico que aun este vigente
      //Si ya pasó la expiración del token, hago un logout
      this.logout();
      return false;
    }

    return true; //el token sigue vigente
  }

  login(loginUsuario: LoginUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.httpClient.post<RespuestaAutenticacionDTO>(
      this.apiURL + '/general',
      loginUsuario
    );
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);

    localStorage.removeItem(this.llaveNombre);
    localStorage.removeItem(this.llaveApellidoPaterno);
    localStorage.removeItem(this.llaveApellidoMaterno);

    this.router.navigate(['login']);
  }

  cerrarSesion() {
    Swal.fire({
      text: 'Cerrar Sesión',
      icon: 'warning',
      iconColor: '#103f23',
      showCancelButton: true,
      confirmButtonColor: '#103f23',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  public obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1])); //se divide en 3, y el 1 es el de la data.
    return dataToken[campo];
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacionDTO) {
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );

    localStorage.setItem(this.llaveNombre, respuestaAutenticacion.nombre);
    localStorage.setItem(
      this.llaveApellidoPaterno,
      respuestaAutenticacion.apellidoPaterno
    );
    localStorage.setItem(
      this.llaveApellidoMaterno,
      respuestaAutenticacion.apellidoMaterno
    );

    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }
}
