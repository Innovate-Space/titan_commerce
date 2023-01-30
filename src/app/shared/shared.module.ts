import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductComponent } from './component/product/product.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardShimmerComponent } from './component/card-shimmer/card-shimmer.component';



@NgModule({
  declarations: [
    ProductComponent,
    SignInComponent,
    SignUpComponent,
    CardShimmerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SkeletonModule
  ],
  exports:[
    ProductComponent,
    SignInComponent,
    SignUpComponent,
    CardShimmerComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
