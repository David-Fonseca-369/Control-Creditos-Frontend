import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '../../helpers';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css'],
})
export class InputImgComponent {
  imagenBase64: string;

  @Input()
  title : string = "Seleccionar Imagen";

  @Input()
  urlImagenActual: string;

  @Output()
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  change(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      toBase64(file)
        .then((value: string) => (this.imagenBase64 = value))
        .catch((error) => console.error(error));

      //Emitimos el archivo
      this.archivoSeleccionado.emit(file);

      //si selecciona nueva imagen, para que no se dupliquen
      this.urlImagenActual = null;
    }
  }
}
