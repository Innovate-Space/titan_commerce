import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/models';
import { ProductActions, ProductsFeature } from '../core/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  currentPage = 0;
  products: ProductModel[] = []
  fakeProducts$ : Observable<any[]>
  isLoading$: Observable<boolean>
  productCount = 0;

  constructor(private readonly store: Store) {
    
    this.fakeProducts$ = this.store.select(ProductsFeature.selectFakeProduct);
    this.isLoading$ = this.store.select(ProductsFeature.selectIsProductsLoading);

  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getallproducts())
    this.store.select(ProductsFeature.selectProducts).subscribe(data => this.productCount = data.length ?? 0)
    this.store.select(ProductsFeature.selectPagedProduct).subscribe(
      (data) => {
        this.products = data[this.currentPage] ?? []
      }
    )
  }

  paginate(event: {first:  number, page: number}) {
    this.currentPage = event.page
    this.store.dispatch(ProductActions.getpaginatedproduct({page: event.page, pageCount: 4}))
    
  }

}
