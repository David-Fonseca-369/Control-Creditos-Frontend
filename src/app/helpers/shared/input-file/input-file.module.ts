import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    InputFileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports :[
    InputFileComponent
  ]
})
export class InputFileModule { }
