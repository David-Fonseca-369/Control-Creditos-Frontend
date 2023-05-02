import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from './usuario/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiURL = environment.apiURL + 'usuarios';


  constructor(private http:HttpClient) { }

  public todosPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<UsuarioDTO[]>(`${this.apiURL}/todosPaginacion`, {
      observe: 'response',
      params,
    });
  }

}
