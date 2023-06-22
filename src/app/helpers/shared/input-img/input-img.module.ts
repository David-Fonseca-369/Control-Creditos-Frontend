import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputImgComponent } from './input-img.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [InputImgComponent],
  imports: [CommonModule, MaterialModule],
  exports: [InputImgComponent],
})
export class InputImgModule {}
