import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Menu } from '../../../componentes/menu/menu';

import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Rolinterface } from '../roles/interface/rolinterface';
import { Registrointerface } from './interface/registrointerface';
import { registrosevices } from './services/registrosevices';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, ButtonModule, TableModule,SelectModule, Menu],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit{

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private registroservices: registrosevices,
    private cd: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rol: ["", Validators.required]
    })
  };

  usuarios: Registrointerface[] = [];
  roles: Rolinterface[] = [];

  ngOnInit(): void {
    this.ObtenerUsuario();
    this.ObtenerRol();
  };

  ObtenerUsuario() {
    this.registroservices.get_users().subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err.status);

        if (err.status === 401) {
          console.log('Error 401 Token invalido o expirado')
        } else if (err.status === 500) {
          console.log('Error 500 un error inesperado en el servidor')
        }
      }
    });
  };

  ObtenerUsuario_id(id: number) {
    this.registroservices.get_users_id(id).subscribe({
      next: (data) => { console.log(data) },
      error: (err) => {
        console.log(err.status);

        if (err.status === 401) {
          console.log('Error 401 Token invalido o expirado')
        } else if (err.status === 404) {
          console.log('Error 404 Rol no encontrado')
        } else if (err.status === 500) {
          console.log('Error 500 un error inesperado en el servidor')
        }
      }
    });
  };

  ObtenerRol() {
    this.registroservices.get_roles().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err.status);

        if (err.status === 401) {
          console.log('Error 401 Token invalido o expirado')
        } else if (err.status === 404) {
          console.log('Error 404 Rol no encontrado')
        } else if (err.status === 500) {
          console.log('Error 500 un error inesperado en el servidor')
        }
      }
    });
  };

  actualizarUsuario(id: number) {
    const data = this.registerForm.value as Registrointerface;
    console.log(data);
    this.registroservices.path_users(id, data).subscribe({
      next: () => {
        this.ObtenerUsuario();
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err.status);

        if (err.status === 401) {
          console.log('Error 401 Token invalido o expirado')
        } else if (err.status === 404) {
          console.log('Error 404 Rol no encontrado')
        } else if (err.status === 500) {
          console.log('Error 500 un error inesperado en el servidor')
        }
      }
    });
  };

  eliminarUsuario(id: number) {
    this.registroservices.delete_users(id).subscribe({
      next: () => {
        this.ObtenerUsuario();
      },
      error: (err) => {
        console.log(err.status);

        if (err.status === 401) {
          console.log('Error 401 Token invalido o expirado')
        } else if (err.status === 404) {
          console.log('Error 404 Rol no encontrado')
        } else if (err.status === 500) {
          console.log('Error 500 un error inesperado en el servidor')
        }
      }
    });
  };

  onSubmit() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;

      this.registroservices.post_users(data).subscribe({
        next: (res) => {
          console.log('El usuario se registro con exito', res);
          this.ObtenerUsuario();
          this.registerForm.reset();
        },
        error: (err) => console.error(err)
      });
    }
  };




}
