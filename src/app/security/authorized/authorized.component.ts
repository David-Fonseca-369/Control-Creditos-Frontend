import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit{

  @Input()
  rol : string;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  estaAutorizado(): boolean{

    if(this.rol){ //si hay rol definido
      return this.securityService.obtenerRol() === this.rol;

    } else{ //si no hay rol definido
      return this.securityService.estaLogueado();
    }
  }



}
