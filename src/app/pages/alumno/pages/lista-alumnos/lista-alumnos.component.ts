import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumnosService } from '../../alumnos.service';
import { AlumnoDTO } from '../../models/alumno';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { PageEvent } from '@angular/material/paginator';
import { CrearAlumnoDialogComponent } from '../crear-alumno-dialog/crear-alumno-dialog.component';
import { EditarAlumnoDialogComponent } from '../editar-alumno-dialog/editar-alumno-dialog.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit {
  isLoading = false;
  alumnos: AlumnoDTO[];
  columnasAMostrar = ['nombre', 'noCuenta', 'correo', 'estado'];

  //Pagination
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  errores: string[] = [];
  form: FormGroup;
  formSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.subscribe();
    this.obtenerAlumnos();
  }



  subscribe() {
    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.filtrarAlumnos(value);
    });
  }

  unsubscribe() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
    });
  }

  obtenerAlumnos() {
    this.isLoading = true;
    this.alumnosService
      .todosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<AlumnoDTO[]>) => {
          this.isLoading = false;

          this.alumnos = response.body;

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

  filtrarAlumnos(values: any) {
    this.isLoading = true;

    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.alumnosService.filtrar(values).subscribe({
      next: (response: HttpResponse<AlumnoDTO[]>) => {
        this.isLoading = false;
        this.alumnos = response.body;
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

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    if (!this.esFiltro(this.form.value.text)) {
      //no está filtrando
      this.obtenerAlumnos();
    } else {
      //es con filtro
      this.filtrarAlumnos(this.form.value);
    }
  }
  esFiltro(text: string) {
    return text !== '' && text !== null;
  }

  openCrearAlumno() {
    const dialogRef = this.dialog.open(CrearAlumnoDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerAlumnos();
      }
    });
  }

  openEditarAlumno(id: number) {
    const dialogRef = this.dialog.open(EditarAlumnoDialogComponent, {
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerAlumnos();
      }
    });
  }
}
