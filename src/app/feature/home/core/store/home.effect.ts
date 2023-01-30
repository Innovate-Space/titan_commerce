
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { NetworkHelperService } from 'src/app/core/api/network-helper.service';
import { ProductModel, User } from 'src/app/core/models';
import { HomeActions } from './home.actions';

@Injectable()
export class HomeEffects {

    constructor(private readonly actions$: Actions, private readonly netWorkHelper: NetworkHelperService) {}

    getProducts$ = createEffect(()=> this.actions$.pipe(
        ofType(HomeActions.getallproducts),
        mergeMap(action => 
            this.netWorkHelper.get<ProductModel[]>('/products?limit=8').pipe(
                map(products => HomeActions.getallproductssuccess({products: products})),
                catchError(error => of(HomeActions.getproductsfailure(error.error['message'])))
            )
        )
    ));

}

