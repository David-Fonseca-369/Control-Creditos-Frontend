import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityInterceptorService implements HttpInterceptor{

  constructor(private securityService : SecurityService) { }

  //si tienen un token, clona la solicitud e intercepta el token
  //** Se declara en providers */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.securityService.obtenerToken();
    if(token){
      req = req.clone({
        setHeaders : {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(req);
  }
}
