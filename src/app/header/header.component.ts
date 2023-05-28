import { Component, EventEmitter, Output } from '@angular/core';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  constructor(public securityService : SecurityService){

  }
  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }


  getNombre(): string {
    let nombre = localStorage.getItem('nombre');
    let apellidoPaterno = localStorage.getItem('apellidoPaterno');
    let apellidoMaterno = localStorage.getItem('apellidoMaterno');

    return `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
  }
}
