import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
})
export class InputFileComponent {
  @Input()
  filter: string;

  @Output()
  selectedFile: EventEmitter<File> = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput: ElementRef;

  change(event: any) {
    if (event.target.value.length > 0) {
      const file: File = event.target.files[0]; //obtengo el archivo seleccionado
      //emitimos el archivo
      this.selectedFile.emit(file);

      //limpio el input
      this.resetFileInput();
    }
  }

  resetFileInput() {
    this.fileInput.nativeElement.value = '';
  }
}
