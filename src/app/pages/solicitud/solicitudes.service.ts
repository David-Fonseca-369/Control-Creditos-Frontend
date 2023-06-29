import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudCreacionDTO, SolicitudDTO, SolicitudInstructorDTO } from './models/solicitud';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private apiURL = environment.apiURL + 'solicitudes';

  constructor(private http: HttpClient) {}

  public crear(solicitud: SolicitudCreacionDTO): Observable<any> {
    return this.http.post(`${this.apiURL}/crear`, solicitud);
  }

  public solicitudesAlumnoPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idAlumno: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<SolicitudDTO[]>(
      `${this.apiURL}/solicitudesAlumnoPaginacion/${idAlumno}`,
      {
        observe: 'response',
        params,
      }
    );
  }

  public solicitudesAlumnoFiltrar(
    values: any,
    idAlumno: number
  ): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<SolicitudDTO[]>(
      `${this.apiURL}/solicitudesAlumnoFiltrar/${idAlumno}`,
      {
        params,
        observe: 'response',
      }
    );
  }


  public solicitudesInstructorPaginacion(
    pagina: number,
    cantidadRegistrosAMostrar: number,
    idUsuario: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<SolicitudInstructorDTO[]>(
      `${this.apiURL}/solicitudesInstructorPaginacion/${idUsuario}`,
      {
        observe: 'response',
        params,
      }
    );
  }
}
