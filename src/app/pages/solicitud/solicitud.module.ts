import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SpinnerModule } from 'src/app/helpers/shared/spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarErroresModule } from 'src/app/helpers/shared/mostrar-errores/mostrar-errores.module';
import { ListaSolicitudesAlumnoComponent } from './pages/lista-solicitudes-alumno/lista-solicitudes-alumno.component';
import { ListaSolicitudesInstructorComponent } from './pages/lista-solicitudes-instructor/lista-solicitudes-instructor.component';
import { ComentariosSolicitudDialogComponent } from './pages/comentarios-solicitud-dialog/comentarios-solicitud-dialog.component';


@NgModule({
  declarations: [
    ListaSolicitudesAlumnoComponent,
    ListaSolicitudesInstructorComponent,
    ComentariosSolicitudDialogComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    MaterialModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MostrarErroresModule
  ]
})
export class SolicitudModule { }
