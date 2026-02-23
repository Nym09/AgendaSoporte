import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loginservice {
  private apiurl='http://localhost:3000/api/auth';

  constructor(private http: HttpClient){}

  login(data:any){
    return this.http.post(`${this.apiurl}/`,data)
  }
}
