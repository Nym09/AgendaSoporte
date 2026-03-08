import { Component } from '@angular/core';
import { Loginservice } from '../login/loginservice';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  constructor(private loginservice:Loginservice){}

  ngOnInit(){
    this.loginservice.iniciosesion().subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
