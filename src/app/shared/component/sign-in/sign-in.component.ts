import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  showPassword: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private readonly fb: FormBuilder){}

  onSubmit(){
    alert(JSON.stringify(this.loginForm.value))
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword
  }

}
