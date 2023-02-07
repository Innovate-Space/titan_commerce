import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
  { path: 'product-list', loadChildren: () => import('./feature/product/product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'product-detail/:id', loadChildren: () => import('./feature/product/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path: 'cart', loadChildren: () => import('./feature/cart/cart.module').then(m => m.CartModule) },
  { path: '**', redirectTo: 'home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
