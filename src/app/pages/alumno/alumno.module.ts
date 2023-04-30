import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { ListaAlumnosComponent } from './pages/lista-alumnos/lista-alumnos.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AlumnoNuevoDialogComponent } from './pages/alumno-nuevo-dialog/alumno-nuevo-dialog.component';


@NgModule({
  declarations: [
    ListaAlumnosComponent,
    AlumnoNuevoDialogComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    MaterialModule
  ]
})
export class AlumnoModule { }
