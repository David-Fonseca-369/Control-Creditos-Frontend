import { FormGroup } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SecurityService } from '../security/security.service';
import { inject } from '@angular/core';

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.error) {
    if (typeof response.error === 'string') {
      //si solo es un string
      resultado.push(response.error);
    } else if (Array.isArray(response.error)) {
      response.error.forEach((valor) => resultado.push(valor.description));
    } else {
      const mapaErrores = response.error.errors;
      //transformamos el objeto a un arreglo
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0]; //obtenemos el error
        arreglo[1].forEach((mensajeError) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }

  return resultado;
}

//Validador de errores genérico
export function obtenerErroresGenerico(
  nombreCampo: string,
  nombreMostrar: string,
  form: FormGroup,
  minLength?: number,
  maxLength?: number
): string {
  const campo = form.get(nombreCampo);

  if (campo.hasError('required')) {
    return `El campo ${nombreMostrar} es requerido.`;
  }

  //Longitud mínima

  if (typeof minLength !== undefined) {
    if (campo.hasError('minlength')) {
      return `La longitud mínima es de ${minLength} caracteres.`;
    }
  }

  //Longitud máxima

  if (typeof maxLength !== undefined) {
    if (campo.hasError('maxlength')) {
      return `La longitud máxima es de ${maxLength} caracteres.`;
    }
  }

  if (campo.hasError('email')) {
    return `Debe ingresar un Correo valido.`;
  }

  return '';
}

export function esAdminGuard(): CanActivateFn {
  return () => {
    const oauthService: SecurityService = inject(SecurityService);
    const router: Router = inject(Router);

    if (oauthService.obtenerRol() === 'Administrador') {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  };
}

export const isUserAdminGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(SecurityService);
  const router = inject(Router);

  if (auth.obtenerRol() === 'Administrador') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
