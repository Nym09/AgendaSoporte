import { Component, signal } from '@angular/core';
import {  MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface MenuItem{
  path: string;
  label:string;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule,RouterModule],
  templateUrl: './custom-sidenav.html',
  styleUrl: './custom-sidenav.css',
})
export class CustomSidenav {
  items = signal<MenuItem[]>([
    {path:'/inicio', label: 'Inicio'},
    {path:'usuarios',label:'Usuarios'},
    {path:'calendario',label:'Calendario'}
  ]);
}
