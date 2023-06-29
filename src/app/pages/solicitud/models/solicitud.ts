export interface SolicitudCreacionDTO {
  idCurso: number;
  idAlumno: number;
  comentariosSolicitud: string;
}

export interface SolicitudDTO {
  id: number;
  nombreCurso: string;
  nombreInstructor: string;
  estado: number;
  constanciaURL: string;
  fechaCreacion: Date;
}

export interface SolicitudInstructorDTO {
  id: number;
  nombreCurso: string;
  nombreAlumno: string;
  correoAlumno: string;
  noCuentaAlumno: string;
  estado: number;
  comentariosSolicitud: string;
  fechaCreacion: Date;
}
