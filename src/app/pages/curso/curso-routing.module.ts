import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { ListaCursosDisponiblesComponent } from './pages/lista-cursos-disponibles/lista-cursos-disponibles.component';
import { isAlumnoGuard, isInstructorGuard } from 'src/app/security/guards/guards';

const routes: Routes = [
  {
    path: 'lista',
    component : ListaCursosComponent,
    canActivate: [isInstructorGuard]
  },
  {
    path: 'lista-cursos-disponibles',
    component : ListaCursosDisponiblesComponent,
    canActivate : [isAlumnoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
