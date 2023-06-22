import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { CursosService } from '../../cursos.service';
import { NotifyService } from 'src/app/services/notify.service';
import { MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { CursoCreacionDTO } from '../../models/curso';
@Component({
  selector: 'app-crear-curso-dialog',
  templateUrl: './crear-curso-dialog.component.html',
  styleUrls: ['./crear-curso-dialog.component.css'],
})
export class CrearCursoDialogComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  errores: string[] = [];
  archivosAdjuntos: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<CrearCursoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      limiteEstudiantes: ['', Validators.required],
      fondo: '',
      archivosAdjuntos: [],
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

  archivoSeleccionado(archivo: File) {
    this.form.get('fondo').setValue(archivo);
  }

  guardar() {
    this.isLoading = true;

    this.form.get('archivosAdjuntos').setValue(this.archivosAdjuntos);

    this.cursosService.crear(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Creado!');
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  fileSelected(file: File) {
    //hacer la conversion 1mb  a bits
    if (file.size >= 1000000) {
      Swal.fire({
        title: 'Error',
        text: 'File cannot be larger than 1 MB',
        showCancelButton: false,
        icon: 'warning',
        confirmButtonColor: '#6A6A6C',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        iconColor: '#f50000',
      });
    } else {
      this.archivosAdjuntos.push(file);
    }
  }

  deleteFile(index : number) {
    //indice del elemento a eliminar  y la cantidad de elementos a eliminar
    this.archivosAdjuntos.splice(index, 1);
  }
}
