import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./pages/alumno/alumno.module').then((m) => m.AlumnoModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
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
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
