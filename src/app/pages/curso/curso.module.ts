import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { CrearCursoDialogComponent } from './pages/crear-curso-dialog/crear-curso-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SpinnerModule } from 'src/app/helpers/shared/spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputImgModule } from 'src/app/helpers/shared/input-img/input-img.module';
import { MostrarErroresModule } from 'src/app/helpers/shared/mostrar-errores/mostrar-errores.module';
import { EditarCursoDialogComponent } from './pages/editar-curso-dialog/editar-curso-dialog.component';
import { InputFileModule } from 'src/app/helpers/shared/input-file/input-file.module';
import { ListaCursosDisponiblesComponent } from './pages/lista-cursos-disponibles/lista-cursos-disponibles.component';


@NgModule({
  declarations: [
    ListaCursosComponent,
    CrearCursoDialogComponent,
    EditarCursoDialogComponent,
    ListaCursosDisponiblesComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    MaterialModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    InputImgModule,
    MostrarErroresModule,
    InputFileModule
  ]
})
export class CursoModule { }
