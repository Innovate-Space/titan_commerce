import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { StoreModule } from '@ngrx/store';
import { ProductEffects, ProductsFeature } from '../core/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    StoreModule.forFeature(ProductsFeature),
    EffectsModule.forFeature([ProductEffects]),
    PaginatorModule,
    SharedModule

  ]
})
export class ProductListModule { }
