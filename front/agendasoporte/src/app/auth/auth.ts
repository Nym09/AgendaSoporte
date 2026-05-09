import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { Authservices } from './service/authservices';
import { Registrointerface } from '../administracion/componentes/registro/interface/registrointerface';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-auth',
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {

  
  authForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: Authservices,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  };

  onSubmit() {
    if (this.authForm.valid) {
      const data = this.authForm.value as Registrointerface;
      this.authService.login(data).subscribe({
        next: (res) => {
          console.log('El usuario ingreso con exito,se logro respuesta 200');
          this.authService.save_token(res.token);
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          console.error(err);

          if (err.status === 400) {
            console.log('Error 400 Credenciales incorrectas')
          } else if (err.status === 500) {
            console.log('Error 500 un error inesperado en el servidor')
          }
        }
      });
    }
  }

}
