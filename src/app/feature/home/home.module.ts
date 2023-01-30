import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { HomeProductsComponent } from './home-products/home-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { HomeEffects, HomeFeature } from './core/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    HomeProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    GalleriaModule,
    StoreModule.forFeature(HomeFeature),
    EffectsModule.forFeature([HomeEffects])
  ]
})
export class HomeModule { }
