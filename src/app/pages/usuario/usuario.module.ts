import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [CommonModule, UsuarioRoutingModule, MaterialModule],
})
export class UsuarioModule {}
