import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SpinnerModule } from 'src/app/helpers/shared/spinner/spinner.module';
import { CrearUsuarioDialogComponent } from './pages/crear-usuario-dialog/crear-usuario-dialog.component';

//Formularios Reactivos
//Binding de doble via
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioEditarDialogComponent } from './pages/usuario-editar-dialog/usuario-editar-dialog.component';

@NgModule({
  declarations: [ListaUsuariosComponent, CrearUsuarioDialogComponent, UsuarioEditarDialogComponent],
  imports: [CommonModule, UsuarioRoutingModule, MaterialModule, SpinnerModule,
  ReactiveFormsModule, FormsModule],
})
export class UsuarioModule {}
