import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,

  ],
  imports: [CommonModule],
  // providers: [
  //   {
  //     // provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  //     // useValue: { appearance: 'outline'},
  //   },
  // ]
})
export class MaterialModule {}
