import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loginservice } from './loginservice';
import { Router } from '@angular/router';

interface LoginResponse {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  login:FormGroup;

  constructor(private fb:FormBuilder,private loginservice: Loginservice, private router:Router){
    this.login=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]]
    })
  }


  submit() {
    this.loginservice.login(this.login.value).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);

        if (data.status === "Success") {
          this.router.navigate(["/inicio"]);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
