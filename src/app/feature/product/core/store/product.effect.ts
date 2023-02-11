
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, } from 'rxjs/operators';
import { NetworkHelperService } from 'src/app/core/api/network-helper.service';
import { ProductModel, User } from 'src/app/core/models';
import { ProductActions } from './product.action';

@Injectable()
export class ProductEffects {

    constructor(private readonly actions$: Actions, private readonly netWorkHelper: NetworkHelperService) {}

    getProducts$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductActions.getallproducts),
        mergeMap(() => 
            this.netWorkHelper.get<ProductModel[]>('/products').pipe(
                map(products => ProductActions.getallproductssuccess({products: products})),
                catchError(error => of(ProductActions.getproductsfailure(error.error['message'])))
            )
        )
    ));

    extractProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.getallproductssuccess),
        map(() => ProductActions.getpaginatedproduct({page: 0, pageCount: 4}))
    ))

}


