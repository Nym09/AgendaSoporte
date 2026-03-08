import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../header/header';
import { CustomSidenav } from '../custom-sidenav/custom-sidenav';
import { Router, RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-aside', 
  imports: [Header, MatSidenavModule, CustomSidenav, RouterModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  constructor(private http:HttpClient, private router:Router){}
  logout(){

  this.http.post('http://localhost:3000/api/auth/finalizarsesion',{},{
    withCredentials:true
  })
  .subscribe({
    next:()=>{
      console.log("Sesión finalizada");
      this.router.navigate(['/']);
    },
    error:(err)=>{
      console.error("Error al cerrar sesión",err);
    }
  });

}
}
