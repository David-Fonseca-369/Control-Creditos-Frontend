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
}
