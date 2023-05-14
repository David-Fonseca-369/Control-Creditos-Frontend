import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoCreacionDTO, AlumnoDTO, AlumnoEditarDTO, AlumnoPreviewDTO } from './models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

 private apiURL = environment.apiURL + 'alumnos';

  constructor(private http : HttpClient) { }

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

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/todosPaginacion`, {
      observe: 'response',
      params,
    });
  }

  public filtrar(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<AlumnoDTO[]>(`${this.apiURL}/filtrar`, {
      params,
      observe: 'response',
    });
  }

  public get(id: number): Observable<AlumnoPreviewDTO> {
    return this.http.get<AlumnoPreviewDTO>(`${this.apiURL}/${id}`);
  }

  public crear(usuario: AlumnoCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, usuario);
  }

  public editar(id: number, usuario: AlumnoEditarDTO): Observable<any> {
    return this.http.put(`${this.apiURL}/editar/${id}`, usuario);
  }

}
