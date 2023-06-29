import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard, isInstructorGuard } from './security/guards/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./pages/alumno/alumno.module').then((m) => m.AlumnoModule),
        canActivate: [isAdminGuard],
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
        canActivate: [isAdminGuard],
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./pages/curso/curso.module').then((m) => m.CursoModule),
      },
      {
        path: 'solicitudes',
        loadChildren: () =>
           import('./pages/solicitud/solicitud.module').then((m) => m.SolicitudModule),
      },
      {
        path: 'static',
        loadChildren: () =>
          import('./pages/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/home-page',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
