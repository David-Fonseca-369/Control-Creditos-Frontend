import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { UsuariosService } from 'src/app/pages/usuarios.service';
import { RolSelectorDTO } from 'src/app/services/models/roles';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-crear-usuario-dialog',
  templateUrl: './crear-usuario-dialog.component.html',
  styleUrls: ['./crear-usuario-dialog.component.css'],
})
export class CrearUsuarioDialogComponent implements OnInit {
  isLoading = false;
  roles: RolSelectorDTO[];
  form: FormGroup;
  errores: string[] = [];
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private usuariosService: UsuariosService,
    private dialogRef : MatDialogRef<CrearUsuarioDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.obtenerRoles();
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60),
        ],
      ],
    });
  }
  obtenerRoles() {
    this.isLoading = true;

    this.rolesService.rolesSelector().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.roles = response;
        console.log(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

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
  guardar() {
    this.isLoading = true;

    this.usuariosService.crear(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);

      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
        console.log(error)
      },
    });
  }
}
