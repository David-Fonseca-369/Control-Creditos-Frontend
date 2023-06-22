import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../cursos.service';
import { CursoDTO, CursoPublicoDTO } from '../../models/curso';
import { HttpResponse } from '@angular/common/http';
import { parsearErroresAPI } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-lista-cursos-disponibles',
  templateUrl: './lista-cursos-disponibles.component.html',
  styleUrls: ['./lista-cursos-disponibles.component.css'],
})
export class ListaCursosDisponiblesComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];

  cursosPublicos: CursoPublicoDTO[];

  //Pagination
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.obtenerCursosPublicos();
  }

  obtenerCursosPublicos() {
    this.isLoading = true;

    this.cursosService
      .publicosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<CursoPublicoDTO[]>) => {
          this.isLoading = false;
          this.cursosPublicos = response.body;
          this.cantidadTotalRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }
}
