import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
//Carousel
//npm i angular-responsive-carousel --force
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    StaticRoutingModule,
    IvyCarouselModule
  ]
})
export class StaticModule { }
