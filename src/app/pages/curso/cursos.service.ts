import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ArchivoCursoDTO,
  CursoCreacionDTO,
  CursoDTO,
  CursoPreviewEditDTO,
  CursoPublicoDTO,
} from './models/curso';
import { formatearFecha } from 'src/app/helpers/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiURL = environment.apiURL + 'cursos';
  constructor(private http: HttpClient) {}

  public todosPaginacion(
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

    return this.http.get<CursoDTO[]>(
      `${this.apiURL}/todosPaginacion/${idUsuario}`,
      {
        observe: 'response',
        params,
      }
    );
  }
  public publicosPaginacion(
    idAlumno: number,
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<CursoPublicoDTO[]>(
      `${this.apiURL}/publicosPaginacion/${idAlumno}`,
      {
        observe: 'response',
        params,
      }
    );
  }

  public filtrar(values: any, idUsuario: number): Observable<any> {
    const params = new HttpParams({ fromObject: values });

    return this.http.get<CursoDTO[]>(`${this.apiURL}/filtrar/${idUsuario}`, {
      params,
      observe: 'response',
    });
  }

  public get(id: number): Observable<CursoPreviewEditDTO> {
    return this.http.get<CursoPreviewEditDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerArchivosCurso(idCurso: number): Observable<ArchivoCursoDTO[]> {
    return this.http.get<ArchivoCursoDTO[]>(
      `${this.apiURL}/obtenerArchivosCurso/${idCurso}`
    );
  }

  public crear(curso: CursoCreacionDTO) {
    console.log(curso);
    const formData = this.construirFormulario(curso);
    return this.http.post(`${this.apiURL}/crear`, formData);
  }

  public editar(idCurso: number, curso: CursoCreacionDTO) {
    const formData = this.construirFormulario(curso);
    return this.http.put(`${this.apiURL}/editar/${idCurso}`, formData);
  }

  public publicar(id: number) {
    return this.http.put(`${this.apiURL}/publicar/${id}`, null);
  }

  public eliminarCurso(id: number) {
    return this.http.delete(`${this.apiURL}/eliminarCurso/${id}`);
  }

  public eliminarArchivo(idArchivo: number) {
    return this.http.delete(`${this.apiURL}/eliminarArchivo/${idArchivo}`);
  }

  private construirFormulario(curso: CursoCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', curso.nombre);
    formData.append('descripcion', curso.descripcion);
    formData.append('fechaInicio', formatearFecha(curso.fechaInicio));
    formData.append('fechaFin', formatearFecha(curso.fechaFin));
    formData.append('limiteEstudiantes', String(curso.limiteEstudiantes));

    if (curso.fondo) {
      formData.append('fondo', curso.fondo);
    }

    //si se adjuntaron archivos
    if (curso.archivosAdjuntos) {
      curso.archivosAdjuntos.forEach((element) => {
        formData.append('archivosAdjuntos', element);
      });
    }

    return formData;
  }
}
