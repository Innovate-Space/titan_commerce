import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.model';
import { HomeActions, HomeFeature } from '../core/store';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {

  products$ : Observable<ProductModel[]>
  fakeProducts$ : Observable<any[]>
  isLoading$: Observable<boolean>

  constructor(private readonly store: Store) {
    this.products$ = this.store.select(HomeFeature.selectProducts);
    this.fakeProducts$ = this.store.select(HomeFeature.selectFakeProduct);
    this.isLoading$ = this.store.select(HomeFeature.selectIsProductsLoading)
  }
  ngOnInit(): void {
    this.store.dispatch(HomeActions.getallproducts())
  }
  
  
}
