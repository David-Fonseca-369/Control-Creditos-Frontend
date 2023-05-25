export interface RespuestaAutenticacionDTO{
  nombre : string;
  apellidoPaterno : string;
  apellidoMaterno : string;
  token : string;
  expiracion: Date;

}

export interface LoginUsuarioDTO{
  correo : string;
  password : string;
}

