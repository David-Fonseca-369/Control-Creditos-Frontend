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


export function toBase64(file: File){

	//una "promise" en javascript es una funcion que va temrinar su ejecución en un futuro
	//es decir que aunque no va a terminar inmeediatamente nos promete que eventualmente
	//lo va a terminar y cuando termine se va a ejecutar la función
	//..."resolve" para que trabaje con el resultado y un error en caso de que lo haya

	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	})
}

export function formatearFecha(date: Date){
	date = new Date(date);//a veces no viene con el formato esperado y este le vuelve a dar formato cuando viene del web-api.
	const formato = new Intl.DateTimeFormat('en',{
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});

	//se usan ',,'por que el mes es el primer elemnto de arreglo
	//el día el tercer elemento y el año es el quinto.
	const [
		{value: month},,
		{value: day},,
		{value: year}
	] = formato.formatToParts(date);

	return `${year}-${month}-${day}`
}
