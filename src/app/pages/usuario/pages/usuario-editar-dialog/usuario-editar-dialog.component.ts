import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/pages/usuarios.service';
import { UsuarioDTO, UsuarioPreviewDTO } from '../../models/usuario';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { RolSelectorDTO } from 'src/app/services/models/roles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from 'src/app/services/roles.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-usuario-editar-dialog',
  templateUrl: './usuario-editar-dialog.component.html',
  styleUrls: ['./usuario-editar-dialog.component.css'],
})
export class UsuarioEditarDialogComponent implements OnInit {
  isLoading = false;
  usuario: UsuarioPreviewDTO;
  errores: string[] = [];
  roles: RolSelectorDTO[];
  hide = true;

  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private usuariosService: UsuariosService,
    private dialogRef: MatDialogRef<UsuarioEditarDialogComponent>
  ) {}
  ngOnInit(): void {
    this.loadForm();
    this.obtenerRoles();
  }

  getUsuario() {
    this.isLoading = false;

    this.usuariosService.get(this.data.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.usuario = response;
        this.form.patchValue(response);
        console.log(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  obtenerRoles() {
    this.isLoading = true;

    this.rolesService
      .rolesSelector()
      .pipe(
        finalize(() => {
          this.getUsuario();
        })
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.roles = response;
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      idRol: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(60)]],
      telefono: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      correo: [
        '',
        [Validators.required, Validators.maxLength(60), Validators.email],
      ],
      direccion: ['', Validators.maxLength(255)],
      password: ['', [Validators.minLength(8), Validators.maxLength(60)]],
    });
  }

  guardar() {}

  obtenerErrorGenerico(
    nombreCampo: string,
    nombreMostrar: string,
    minLength?: number,
    maxLength?: number
  ): string {
    return obtenerErroresGenerico(
      nombreCampo,
      nombreMostrar,
      this.form,
      minLength,
      maxLength
    );
  }
}
