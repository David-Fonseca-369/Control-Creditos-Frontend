import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../cursos.service';
import { NotifyService } from 'src/app/services/notify.service';
import {
  obtenerErroresGenerico,
  parsearErroresAPI,
} from 'src/app/helpers/helpers';
import { CursoPreviewEditDTO } from '../../models/curso';
import { ArchivoMostrar } from '../../models/archivo';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-curso-dialog',
  templateUrl: './editar-curso-dialog.component.html',
  styleUrls: ['./editar-curso-dialog.component.css'],
})
export class EditarCursoDialogComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  errores: string[] = [];
  curso: CursoPreviewEditDTO;
  archivosMostrar: ArchivoMostrar[] = [];

  //Los nuevos archivos que vaya ha adjuntar
  nuevosArchivosAdjuntos: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<EditarCursoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.getCurso();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      limiteEstudiantes: ['', Validators.required],
      fondo: '',
      archivosAdjuntos: '',
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

  getCurso() {
    this.isLoading = true;

    this.cursosService.get(this.data.id).subscribe({
      next: (response: CursoPreviewEditDTO) => {
        this.isLoading = false;
        this.curso = response;
        this.form.patchValue(response);

        //Agrego los archivos a mostrar
        response.archivosCurso.forEach((element) => {
          //servidor = 1
          //local = 2

          let archivoMostrar: ArchivoMostrar = {
            tipo: 1,
            id: element.id,
            nombre: element.archivoNombre,
            file: null,
            url: element.archivoURL,
          };

          this.archivosMostrar.push(archivoMostrar);
        });
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
      //lo agregamos para mostrar en la vista
      //servidor = 1
      //local = 2

      let archivoMostrar: ArchivoMostrar = {
        tipo: 2,
        id: null,
        nombre: file.name,
        file: file,
        url: null,
      };

      this.archivosMostrar.push(archivoMostrar);
    }
  }
  deleteConfirm(index: number) {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Los archivos se eliminarán de manera permanente.',
      icon: 'warning',
      iconColor: '#103f23',
      showCancelButton: true,
      confirmButtonColor: '#103f23',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFile(index);
      }
    });
  }
  deleteFile(index: number) {
    //lo consulto
    let archivo = this.archivosMostrar[index];

    if (archivo.tipo === 1) {
      //si es de servidor, mandar a eliminar y quitar de la lista
      this.isLoading = true;
      this.cursosService.eliminarArchivo(archivo.id).subscribe({
        next: () => {
          this.isLoading = false;
          //Remuevo de la lista
          this.archivosMostrar.splice(index, 1);
          this.notify.successfulNotification('¡Archivo Eliminado!');
        },
        error: (error) => {
          this.isLoading = false;
          this.errores = parsearErroresAPI(error);
        },
      });
    } else if (archivo.tipo === 2) {
      //si es local, solo eliminar de la lista
      this.archivosMostrar.splice(index, 1);
      this.notify.successfulNotification('¡Archivo Eliminado!');
    }
  }

  archivoSeleccionado(archivo: File) {
    this.form.get('fondo').setValue(archivo);
  }

  guardar() {
    this.isLoading = true;

    //Servidor = 1
    //local = 2
    //Preparo el listado de los nuevos documentos adjuntos
    let nuevosArchivosAdjuntos: File[] = [];
    this.archivosMostrar.forEach((element) => {
      if (element.tipo === 2) {
        //Solo lo cargue los del tipo local
        nuevosArchivosAdjuntos.push(element.file);
      }
    });

    this.form.get('archivosAdjuntos').setValue(nuevosArchivosAdjuntos);

    this.cursosService.editar(this.curso.id, this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.notify.successfulNotification('¡Actualizado!');
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }
}
