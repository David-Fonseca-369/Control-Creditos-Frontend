import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comentarios-solicitud-dialog',
  templateUrl: './comentarios-solicitud-dialog.component.html',
  styleUrls: ['./comentarios-solicitud-dialog.component.css'],
})
export class ComentariosSolicitudDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
