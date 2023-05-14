export interface AlumnoDTO {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  noCuenta: string;
  correo: string;
  estado: boolean;
}

export interface AlumnoPreviewDTO extends AlumnoDTO{
  telefono : string;
}

export interface AlumnoCreacionDTO {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  noCuenta: string;
  correo: string;
  password: string;
}

export interface AlumnoEditarDTO extends AlumnoCreacionDTO {
  estado: boolean;
}
