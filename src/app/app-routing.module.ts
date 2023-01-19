import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./feature/auth/login/login.module').then(m => m.LoginModule) }, 
  { path: 'signup', loadChildren: () => import('./feature/auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'home', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
  { path: 'product-list', loadChildren: () => import('./feature/product/product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'product-detail/:id', loadChildren: () => import('./feature/product/product-detail/product-detail.module').then(m => m.ProductDetailModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
