import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/core/models';
import { GlobalActions, GlobFeature } from 'src/app/core/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart? : Cart;
  isLoading$ : Observable<boolean>
  noItem : boolean = false;

  constructor(private readonly store: Store) {
    this.isLoading$ = this.store.select(GlobFeature.selectIsCartLoading);
  }
  ngOnInit(): void {
    this.store.dispatch(GlobalActions.getCart())
    this.store.select(GlobFeature.selectCart).subscribe(
      (data) => {
        if(data.length <= 0 ) {
          this.noItem = true;
        }else{
          this.cart = data[data.length-1];
        }
      }
    )
  }

}
