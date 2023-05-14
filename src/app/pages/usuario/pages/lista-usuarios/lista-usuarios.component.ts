import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/usuarios.service';
import { UsuarioDTO } from '../../models/usuario';
import { HttpResponse } from '@angular/common/http';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioDialogComponent } from '../crear-usuario-dialog/crear-usuario-dialog.component';
import { UsuarioEditarDialogComponent } from '../usuario-editar-dialog/usuario-editar-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  isLoading = true;
  usuarios: UsuarioDTO[];
  columnasAMostrar = ['nombre', 'nombreRol', 'correo', 'estado'];

  //Pagination
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  errores: string[] = [];
  form: FormGroup;
  formSubscription: Subscription;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loadForm();
    this.subscribe();
    this.obtenerUsuarios();
  }

  subscribe() {
    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.filtrarUsuarios(value);
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

  obtenerUsuarios() {
    this.isLoading = true;
    this.usuariosService
      .todosPaginacion(this.paginaActual, this.cantidadRegistrosAMostrar)
      .subscribe({
        next: (response: HttpResponse<UsuarioDTO[]>) => {
          this.isLoading = false;

          this.usuarios = response.body;

          console.log(this.usuarios);
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

  filtrarUsuarios(values: any) {
    this.isLoading = true;

    values.pagina = this.paginaActual;
    values.recordsPorPagina = this.cantidadRegistrosAMostrar;

    this.usuariosService.filtrar(values).subscribe({
      next: (response: HttpResponse<UsuarioDTO[]>) => {
        this.isLoading = false;
        this.usuarios = response.body;
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
      this.obtenerUsuarios();
    } else {
      //es con filtro
      this.filtrarUsuarios(this.form.value);
    }
  }
  esFiltro(text: string) {
    return text !== '' && text !== null;
  }

  openCrearUsuario() {
    const dialogRef = this.dialog.open(CrearUsuarioDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerUsuarios();
      }
    });
  }

  openEditarUsuarioDialog(id: number) {
    const dialogRef = this.dialog.open(UsuarioEditarDialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerUsuarios();
      }
    });
  }
}
