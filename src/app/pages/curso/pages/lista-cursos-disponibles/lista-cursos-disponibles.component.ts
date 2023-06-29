import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../cursos.service';
import { CursoDTO, CursoPublicoDTO } from '../../models/curso';
import { HttpResponse } from '@angular/common/http';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { MatDialog } from '@angular/material/dialog';
import { DetallesCursoDialogComponent } from '../detalles-curso-dialog/detalles-curso-dialog.component';
import { SecurityService } from 'src/app/security/security.service';

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

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.obtenerCursosPublicos();
  }

  obtenerCursosPublicos() {
    this.isLoading = true;
    let idAlumno = Number(this.securityService.obtenerCampoJWT('idAlumno'));
    console.log(idAlumno)
    this.cursosService
      .publicosPaginacion(
        idAlumno,
        this.paginaActual,
        this.cantidadRegistrosAMostrar
      )
      .subscribe({
        next: (response: HttpResponse<CursoPublicoDTO[]>) => {
          this.isLoading = false;
          this.cursosPublicos = response.body;
          this.cantidadTotalRegistros = response.headers.get(
            'cantidadTotalRegistros'
          );

          console.log(response.body)
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  openDetallesCursoDialog(curso: CursoPublicoDTO) {
    const dialogRef = this.dialog.open(DetallesCursoDialogComponent, {
      data: {
        curso: curso,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerCursosPublicos();
      }
    });
  }
}
