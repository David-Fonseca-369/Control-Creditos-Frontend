import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/pages/usuarios.service';
import { UsuarioDTO } from '../../models/usuario';
import { HttpResponse } from '@angular/common/http';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CrearUsuarioDialogComponent } from '../crear-usuario-dialog/crear-usuario-dialog.component';
import { UsuarioEditarDialogComponent } from '../usuario-editar-dialog/usuario-editar-dialog.component';

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

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.obtenerUsuariosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  obtenerUsuariosPaginacion(pagina: number, cantidadRegistrosAMostrar: number) {
    this.isLoading = true;
    this.usuariosService
      .todosPaginacion(pagina, cantidadRegistrosAMostrar)
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

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.obtenerUsuariosPaginacion(
      this.paginaActual,
      this.cantidadRegistrosAMostrar
    );
  }

  openCrearUsuario() {
    const dialogRef = this.dialog.open(CrearUsuarioDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerUsuariosPaginacion(
          this.paginaActual,
          this.cantidadRegistrosAMostrar
        );
      }
    });
  }

  openEditarUsuarioDialog(id: number) {
    const dialogRef = this.dialog.open(UsuarioEditarDialogComponent, {
      data: {
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
