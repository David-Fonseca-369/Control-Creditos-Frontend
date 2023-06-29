import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../cursos.service';
import { ArchivoCursoDTO } from '../../models/curso';
import { parsearErroresAPI } from 'src/app/helpers/helpers';
import Swal from 'sweetalert2';
import { SolicitudesService } from 'src/app/pages/solicitud/solicitudes.service';
import { SecurityService } from 'src/app/security/security.service';
import { NotifyService } from 'src/app/services/notify.service';
import { SolicitudCreacionDTO } from 'src/app/pages/solicitud/models/solicitud';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalles-curso-dialog',
  templateUrl: './detalles-curso-dialog.component.html',
  styleUrls: ['./detalles-curso-dialog.component.css'],
})
export class DetallesCursoDialogComponent implements OnInit {
  isLoading = false;
  errores: string[] = [];
  archivosAdjuntos: ArchivoCursoDTO[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cursosService: CursosService,
    private solicitudesService: SolicitudesService,
    private securityService: SecurityService,
    private notify: NotifyService,
    private dialogRef: MatDialogRef<DetallesCursoDialogComponent>
  ) {}

  ngOnInit(): void {
    this.obtenerArchivosAdjuntos();
  }

  obtenerArchivosAdjuntos() {
    this.isLoading = true;

    this.cursosService.obtenerArchivosCurso(this.data.curso.id).subscribe({
      next: (response: ArchivoCursoDTO[]) => {
        this.isLoading = false;
        this.archivosAdjuntos = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.errores = parsearErroresAPI(error);
      },
    });
  }

  crearSolicitud(idCurso: number) {
    Swal.fire({
      title: 'Enviar Solicitud',
      text: 'Se enviará la solicitud al instructor',
      input: 'textarea',
      icon: 'question',
      iconColor: '#5a786d',
      confirmButtonColor: '#5a786d',
      cancelButtonColor: '#6A6A6C',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      showLoaderOnConfirm: true,

      //se puso en false  "noImplicitReturns": false,
      preConfirm: async (comments) => {
        if (comments.length <= 250) {
          let idAlumno = Number(
            this.securityService.obtenerCampoJWT('idAlumno')
          );

          let solicitud: SolicitudCreacionDTO = {
            idCurso: idCurso,
            idAlumno: idAlumno,
            comentariosSolicitud: comments,
          };

          try {
            const response = await fetch(
              environment.apiURL + `solicitudes/crear`,
              {
                //Agregamos token de autenticación
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${this.securityService.obtenerToken()}`,
                },
                method: 'POST',
                body: JSON.stringify(solicitud),
              }
            );
            if (!response.ok) {
              //otros posibles errores
              throw new Error(response.statusText);
            }
            return response.ok ? 'ok' : 'not';
          } catch (error) {
            Swal.showValidationMessage(error);
          }
        } else {
          Swal.showValidationMessage(
            'Los comentarios no deben ser más de 250 caracteres.'
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value === 'ok') {
        this.notify.successfulNotification('¡Solicitud enviada!');
        this.dialogRef.close(true);
      }
    });
  }
}
