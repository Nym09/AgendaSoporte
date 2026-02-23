import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loginservice } from '../../../service/loginservice';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  login:FormGroup;

  constructor(private fb:FormBuilder,private loginservice: Loginservice){
    this.login=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]]
    })
  }

  submit(){
    this.loginservice.login(this.login.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      console.log('login exitoso');
    }, err=>{
      console.error(err);
    });
  }
}
