import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAlumnoGuard, isInstructorGuard } from 'src/app/security/guards/guards';
import { ListaSolicitudesAlumnoComponent } from './pages/lista-solicitudes-alumno/lista-solicitudes-alumno.component';
import { ListaSolicitudesInstructorComponent } from './pages/lista-solicitudes-instructor/lista-solicitudes-instructor.component';

const routes: Routes = [
  {
    path : 'lista-solicitudes-alumno',
    component: ListaSolicitudesAlumnoComponent,
    canActivate :[isAlumnoGuard]
  },
  {
    path : 'lista-solicitudes-instructor',
    component: ListaSolicitudesInstructorComponent,
    canActivate :[isInstructorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
