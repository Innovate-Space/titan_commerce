import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { GlobFeature } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSignedIn$ : Observable<boolean>;
  user$ :  Observable<User | null>;
  constructor(private readonly store : Store){
    this.isSignedIn$ = this.store.select(GlobFeature.selectIsLoggedIn);
    this.user$ = this.store.select(GlobFeature.selectUser);
  }
  menuLinks = [
    { path: '/',name: 'Home' },
    { path: '/product-list',name: 'Products' },
    { path: '/cart',name: 'Cart' },
    { path: '/sign-in',name: 'Sign In' },
    { path: '/sign-up',name: 'Sign Up' }
  ]

  display: boolean = false;
  isSignIn: boolean = false;

  toggle(isTrue: boolean){
    this.isSignIn = isTrue
    this.display = true;
  }

  logout(){
    alert("I will logout")
  }

}
