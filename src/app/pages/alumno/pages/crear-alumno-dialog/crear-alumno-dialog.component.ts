import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../alumnos.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';

@Component({
  selector: 'app-crear-alumno-dialog',
  templateUrl: './crear-alumno-dialog.component.html',
  styleUrls: ['./crear-alumno-dialog.component.css'],
})
export class CrearAlumnoDialogComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  errores: string[] = [];
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<CrearAlumnoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
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

    this.alumnosService.crear(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
        console.log(error);
      },
    });
  }
}
