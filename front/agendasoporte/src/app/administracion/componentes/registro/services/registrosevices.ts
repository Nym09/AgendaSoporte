import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Registrointerface } from '../interface/registrointerface';
import { Rolinterface } from '../../roles/interface/rolinterface';

@Injectable({
  providedIn: 'root',
})
export class registrosevices {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  get_users(){
    return this.http.get<Registrointerface[]>(`${this.apiUrl}/users`);
  };

  get_users_id(id: number){
    return this.http.get(`${this.apiUrl}/users/${id}`);
  };


  get_roles(){
     return this.http.get<Rolinterface[]>(`${this.apiUrl}/roles`);
  };

  post_users(data: Registrointerface){
    return this.http.post(`${this.apiUrl}/users`, data);
  };
  
  path_users(id: number, data: Registrointerface){
    return this.http.patch(`${this.apiUrl}/users/{id}`,data);
  };

  delete_users(id:number){
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  };
}
