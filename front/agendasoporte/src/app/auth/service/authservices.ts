import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registrointerface } from '../../administracion/componentes/registro/interface/registrointerface';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class Authservices {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private readonly llavetoken = 'token';

  login(data: Registrointerface) {
    return this.http.post<Auth>(`${this.apiUrl}/auth`, data);
  };


  save_token(token: string): void {
    localStorage.setItem(this.llavetoken, token)
  };

  get_token() {
    return localStorage.getItem(this.llavetoken)
  };

  delete_token() {
    localStorage.removeItem(this.llavetoken)
  };


}
