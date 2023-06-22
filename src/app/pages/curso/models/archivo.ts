export interface ArchivoMostrar{
  tipo: number; //1 = servidor, 2 = local
  id: number; //id si es un registro del servidor (para eliminar)  
  nombre : string //si es de servidor debe tener nombre
  file : File; //si es tipo 2, debe tener archivo
  url : string; //si es del servidor
}