import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../solicitudes.service';
import { SecurityService } from 'src/app/security/security.service';
import { HttpResponse } from '@angular/common/http';
import { SolicitudDTO } from '../../models/solicitud';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-solicitudes-alumno',
  templateUrl: './lista-solicitudes-alumno.component.html',
  styleUrls: ['./lista-solicitudes-alumno.component.css'],
})
export class ListaSolicitudesAlumnoComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  form: FormGroup;
  formSubscription: Subscription;
  columnasAMostrar = [
    'nombreCurso',
    'nombreInstructor',
    'estado',
    'fechaSolicitud',
    'constancia',
  ];

  //Pagination
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  solicitudes: SolicitudDTO[];

  constructor(
    private solicitudesService: SolicitudesService,
    private securityService: SecurityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.subscribe();
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.isLoading = true;

    let idAlumno = Number(this.securityService.obtenerCampoJWT('idAlumno'));
    this.solicitudesService
      .solicitudesAlumnoPaginacion(
        this.paginaActual,
        this.cantidadRegistrosAMostrar,
        idAlumno
      )
      .subscribe({
        next: (response: HttpResponse<SolicitudDTO[]>) => {
          this.isLoading = false;
          this.solicitudes = response.body;

          console.log(response.body);
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

  subscribe() {
    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.filtrar(value);
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

  actualizarPaginacion(data: PageEvent) {
    this.paginaActual = data.pageIndex + 1;
    this.cantidadRegistrosAMostrar = data.pageSize;

    if (this.esFiltro(this.form.value.text)) {
      this.filtrar(this.form.value);
    } else {
      //Si nm hay filtro
      this.obtenerSolicitudes();
    }
  }

  esFiltro(text: string): boolean {
    return text !== '' && typeof text === null;
  }

  filtrar(value: any) {
    this.isLoading = true;

    let idAlumno = Number(this.securityService.obtenerCampoJWT('idAlumno'));

    let values = {
      text: value.text,
      estado: value.estado,
      pagina: this.paginaActual,
      recordsPorPagina: this.cantidadRegistrosAMostrar,
    };

    this.solicitudesService
      .solicitudesAlumnoFiltrar(values, idAlumno)
      .subscribe({
        next: (response: HttpResponse<SolicitudDTO[]>) => {
          this.isLoading = false;
          this.solicitudes = response.body;
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
