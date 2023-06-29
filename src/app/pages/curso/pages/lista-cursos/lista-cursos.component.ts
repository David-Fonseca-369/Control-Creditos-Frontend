import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CrearCursoDialogComponent } from '../crear-curso-dialog/crear-curso-dialog.component';
import { CursosService } from '../../cursos.service';
import { CursoDTO } from '../../models/curso';
import { HttpResponse } from '@angular/common/http';
import { SecurityService } from 'src/app/security/security.service';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { EditarCursoDialogComponent } from '../editar-curso-dialog/editar-curso-dialog.component';

import Swal from 'sweetalert2';
import { NotifyService } from 'src/app/services/notify.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
})
export class ListaCursosComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  form: FormGroup;
  formSubscription: Subscription;
  cursos: CursoDTO[] = [];
  columnasAMostrar = [
    'nombre',
    'periodo',
    'estado',
    'ultimaModificacion',
    'acciones',
  ];

  //Pagination
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  //Filtros
  estados = [
    { id: -1, nombre: '--Todos--' },
    { id: 0, nombre: 'Pendientes' },
    { id: 1, nombre: 'Publicados' },
  ];

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private notify: NotifyService
  ) {}
  ngOnInit(): void {
    this.loadForm();
    this.obtenerCursos();
    this.setEstadoFiltro();
  }


  setEstadoFiltro(){
    this.form.get('estado').setValue(this.estados[0].id);
    this.subscribe();
  }
  loadForm() {
    this.form = this.formBuilder.group({
      text: '',
      estado: '',
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

  obtenerCursos() {
    this.isLoading = true;

    let idUsuario = Number(this.securityService.obtenerCampoJWT('idUsuario'));
    this.cursosService
      .todosPaginacion(
        this.paginaActual,
        this.cantidadRegistrosAMostrar,
        idUsuario
      )
      .subscribe({
        next: (response: HttpResponse<CursoDTO[]>) => {
          this.isLoading = false;
          this.cursos = response.body;

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

  openCrearCurso() {
    const dialogRef = this.dialog.open(CrearCursoDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerCursos();
      }
    });
  }
  openEditarCursoDialog(id: number) {
    const dialogRef = this.dialog.open(EditarCursoDialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerCursos();
      }
    });
  }

  actualizarPaginacion(data: PageEvent) {
    this.paginaActual = data.pageIndex + 1;
    this.cantidadRegistrosAMostrar = data.pageSize;

    if (this.esFiltro(this.form.value.text, this.form.value.estado)) {
      this.filtrar(this.form.value);
    } else {
      //Si nm hay filtro
      this.obtenerCursos();
    }
  }

  filtrar(value: any) {
    this.isLoading = true;

    let idUsuario = Number(this.securityService.obtenerCampoJWT('idUsuario'));

    let values = {
      text: value.text,
      estado: value.estado,
      pagina: this.paginaActual,
      recordsPorPagina: this.cantidadRegistrosAMostrar,
    };

    this.cursosService.filtrar(values, idUsuario).subscribe({
      next: (response: HttpResponse<CursoDTO[]>) => {
        this.isLoading = false;
        this.cursos = response.body;
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

  esFiltro(text: string, estado: number): boolean {
    return (
      (text !== '' && typeof text === null) ||
      (estado !== 0 && estado !== 1)
    );
  }

  publicConfirm(id: number) {
    Swal.fire({
      title: '¿Publicar?',
      text: 'El curso se publicará y no se podrán realizar cambios',
      icon: 'warning',
      iconColor: '#103f23',
      showCancelButton: true,
      confirmButtonColor: '#103f23',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicarCurso(id);
      }
    });
  }

  publicarCurso(id: number) {
    this.isLoading = true;
    this.cursosService.publicar(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Publicado!');
        this.obtenerCursos();
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  deleteConfirm(id: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'El curso se eliminará de manera permanente',
      icon: 'warning',
      iconColor: '#103f23',
      showCancelButton: true,
      confirmButtonColor: '#103f23',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCurso(id);
      }
    });
  }

  deleteCurso(id: number) {
    this.isLoading = true;
    this.cursosService.eliminarCurso(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Eliminado!');
        this.obtenerCursos();
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
