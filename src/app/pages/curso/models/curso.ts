export interface CursoDTO {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: number;
  ultimaModificacion: Date;
}

export interface CursoPreviewEditDTO {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  limiteEstudiantes: number;
  fondoURL: string;
  archivosCurso: ArchivoCursoDTO[];
}

export interface CursoCreacionDTO {
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  limiteEstudiantes: number;
  fondo: File;
  archivosAdjuntos: File[];
}

export interface ArchivoCursoDTO {
  id: number;
  idCurso: number;
  archivoURL: string;
  archivoNombre: string;
}

export interface CursoPublicoDTO {
  id: number;
  idCreador: number;
  nombreInstructor: string;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  limiteEstudiantes: number;
  inscritos: number;
  fondoURL: string;
  solicitudEnviada : boolean;
}
