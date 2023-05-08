import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolSelectorDTO } from './models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiURL = environment.apiURL + 'roles';

  constructor(private http: HttpClient) {}

  public rolesSelector() : Observable<RolSelectorDTO[]> {
    return this.http.get<RolSelectorDTO[]>(`${this.apiURL}/rolesSelector`);
  }
}
