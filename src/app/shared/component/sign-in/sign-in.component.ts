import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalActions, GlobFeature } from 'src/app/core/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  showPassword: boolean = false;
  isLoading$ : Observable<boolean>

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });
  constructor(private readonly fb: FormBuilder, private readonly store: Store){
    this.isLoading$ = store.select(GlobFeature.selectIsLoginLoading);
  }

  onSubmit(){
    const {username, password } = this.loginForm.value;
    this.store.dispatch(GlobalActions.signIn({user: {username: username!, password: password!}}))
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword
  }

}
