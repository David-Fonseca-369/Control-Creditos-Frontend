import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticModule { }
