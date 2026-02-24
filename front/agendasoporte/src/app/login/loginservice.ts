import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  private apiurl='http://localhost:3000/api/auth';

  constructor(private http: HttpClient){}

  login(user:any):Observable<any>{
    return this.http.post(`${this.apiurl}/`,user,{withCredentials:true});
  }

  iniciosesion():Observable<any>{
    return this.http.get(`${this.apiurl}/user`,{withCredentials:true})
  }

  finsesion():Observable<any>{
    return this.http.get(`${this.apiurl}/finalizarsesion`,{withCredentials:true})
  }
}
