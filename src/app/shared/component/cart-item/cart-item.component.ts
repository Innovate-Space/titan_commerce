import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/core/models';
import { GlobalActions, GlobFeature } from 'src/app/core/store';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  
  @Input() productQty!: number;
  @Input() productId!: number
  product?: ProductModel;
  isLoading: boolean = false

  constructor(private readonly store: Store){
    //this.store.dispatch(GlobalActions.getProductInfo({id: this.productId}))
  }

  ngOnInit(): void {
    this.store.dispatch(GlobalActions.getProductInfo({id: this.productId}))
    this.store.select(GlobFeature.selectCartProducts).subscribe((data) => {
      this.product = data[this.productId];
    })
    this.store.select(GlobFeature.selectCartProductsLoading).subscribe(data => {
      this.isLoading = data[this.productId]
    })
    this.code()
  }

  code(){
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    console.log(formatter.format(5000000))
    let n = 50000000000
    console.log(n.toLocaleString())
  }


}
