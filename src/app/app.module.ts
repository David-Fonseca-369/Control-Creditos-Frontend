import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { MenuListComponent } from './menu-list/menu-list.component';

////v11.0.0
//npm i @sweetalert2/ngx-sweetalert2@11.0.0 --force

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Formularios Reactivos
//Binding de doble via
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Para consumir APIs
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { SecurityInterceptorService } from './security/security-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuListComponent,
    AuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [
    //Declaro el HttpInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
