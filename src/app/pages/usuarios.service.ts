import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UsuarioCreacionDTO,
  UsuarioDTO,
  UsuarioEditarDTO,
  UsuarioPreviewDTO,
} from './usuario/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiURL = environment.apiURL + 'usuarios';

  constructor(private http: HttpClient) {}

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

  public filtrar(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<UsuarioDTO[]>(`${this.apiURL}/filtrar`, {
      params,
      observe: 'response',
    });
  }

  public get(id: number): Observable<UsuarioPreviewDTO> {
    return this.http.get<UsuarioPreviewDTO>(`${this.apiURL}/${id}`);
  }

  public crear(usuario: UsuarioCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, usuario);
  }

  public editar(id: number, usuario: UsuarioEditarDTO): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, usuario);
  }
}
