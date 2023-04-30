import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnoNuevoDialogComponent } from '../alumno-nuevo-dialog/alumno-nuevo-dialog.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent {
  constructor( private dialog : MatDialog) {}

  openNuevoAlumno() {

    this.dialog.open(AlumnoNuevoDialogComponent)
  }
}
