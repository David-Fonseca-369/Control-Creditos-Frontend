import { Component, Inject, OnInit } from '@angular/core';
import {
  AlumnoDTO,
  AlumnoEditarDTO,
  AlumnoPreviewDTO,
} from '../../models/alumno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../alumnos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';

@Component({
  selector: 'app-editar-alumno-dialog',
  templateUrl: './editar-alumno-dialog.component.html',
  styleUrls: ['./editar-alumno-dialog.component.css'],
})
export class EditarAlumnoDialogComponent implements OnInit {
  isLoading = false;
  alumno: AlumnoPreviewDTO;
  errores: string[] = [];
  hide = true;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<EditarAlumnoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getAlumno();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(60)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(60)]],
      telefono: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      noCuenta: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      correo: [
        '',
        [Validators.required, Validators.maxLength(60), Validators.email],
      ],
      password: ['', [Validators.minLength(8), Validators.maxLength(60)]],
      estado: ['', Validators.required],
    });
  }

  getAlumno() {
    this.isLoading = false;

    this.alumnosService.get(this.data.id).subscribe({
      next: (response: AlumnoPreviewDTO) => {
        this.isLoading = false;
        this.alumno = response;
        this.form.patchValue(response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  guardar() {
    let usuarioEditar: AlumnoEditarDTO = {
      nombre: this.form.value.nombre,
      apellidoPaterno: this.form.value.apellidoPaterno,
      apellidoMaterno: this.form.value.apellidoMaterno,
      telefono: this.form.value.telefono,
      noCuenta: this.form.value.noCuenta,
      correo: this.form.value.correo,
      password:
        this.form.value.password == '' ? null : this.form.value.password,
      estado: this.form.value.estado,
    };

    this.isLoading = true;

    this.alumnosService.editar(this.data.id, usuarioEditar).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
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
}
