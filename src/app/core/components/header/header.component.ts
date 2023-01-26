import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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

}
