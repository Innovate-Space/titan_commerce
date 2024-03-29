import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { GlobalActions, GlobFeature } from '../../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSignedIn$ : Observable<boolean>;
  user$:  Observable<User | null>;
  cartCount : number = 0;
  constructor(private readonly store : Store){
    this.isSignedIn$ = this.store.select(GlobFeature.selectIsLoggedIn);
    this.user$ = this.store.select(GlobFeature.selectUser);
    this.store.select(GlobFeature.selectIsAuthModalOpen).subscribe(d => this.display = d);
  }
  ngOnInit(): void {
    this.store.select(GlobFeature.selectCart).subscribe(data => {
      if(data.length <= 0 ) {
        this.cartCount = 0;
      }else{
        this.cartCount = data[data.length-1].products.length;
      }

    })
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
    this.store.dispatch(GlobalActions.toggleAuthModal({status: true}));
  }

  logout(){
    this.store.dispatch(GlobalActions.logOut());
  }

}
