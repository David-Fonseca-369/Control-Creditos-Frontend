import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AlumnoNuevoDialogComponent } from './pages/alumno-nuevo-dialog/alumno-nuevo-dialog.component';
import { SpinnerModule } from 'src/app/helpers/shared/spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearAlumnoDialogComponent } from './pages/crear-alumno-dialog/crear-alumno-dialog.component';
import { EditarAlumnoDialogComponent } from './pages/editar-alumno-dialog/editar-alumno-dialog.component';


@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AlumnoNuevoDialogComponent,
    CrearAlumnoDialogComponent,
    EditarAlumnoDialogComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    MaterialModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AlumnoModule { }
