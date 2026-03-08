import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
export interface Rol {
  id_rol: number;
  name: string;
}
@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  registerForm: FormGroup;
  roles: Rol[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rol: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.selectroles();
  }

  selectroles() {
    this.http.get<Rol[]>('http://localhost:3000/api/auth/roles')
      .subscribe(data => {
        this.roles = data;
      });
  }

  submit() {

    if (this.registerForm.invalid) {
      console.log("Formulario inválido");

      if (this.registerForm.get('password')?.errors?.['minlength']) {
        console.log("La clave debe tener mínimo 6 caracteres");
      }

      if (this.registerForm.get('email')?.errors?.['email']) {
        console.log("El email no es válido");
      }

      return;
    }

    const registrousuario = this.registerForm.value;

    console.log(registrousuario);

    this.http.post('http://localhost:3000/api/auth/registrousuario', registrousuario)
      .subscribe({
        next: (res) => {
          console.log("Usuario Creado", res);
          this.registerForm.reset();
        },
        error: (err) => {
          if (err.status === 400) {
            console.log("El email ya está registrado");
          }
          console.error("Error del servidor", err);
        }
      });

  }
}
