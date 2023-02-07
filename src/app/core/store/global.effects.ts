
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { NetworkHelperService } from '../api/network-helper.service';
import { Cart, ProductModel, User } from '../models';
import { CacheService } from '../services/cache.service';
import { GlobalActions } from './global.action';
import { GlobFeature } from './global.reducer';

type auth  = {username: string, password: string};
type token = {token: string};

@Injectable()
export class AuthEffects {
    // REHYDRATE THEE APPLICATION STATE BACK INTO THE STORE FROM THE CACHE
    init$ = createEffect(()=> this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => {
            const user = this.cache.getUserData();
            return user ? GlobalActions.rehydratedTheUser({user: user}): GlobalActions.doNothing();
        }),
    ))

    rehydrateSuccess$ = createEffect(()=> this.actions$.pipe(
        ofType(GlobalActions.rehydratedTheUser),
        map(() => GlobalActions.getCart() )
    ))

    constructor(
        private readonly actions$: Actions, 
        private readonly netWorkHelper: NetworkHelperService, 
        private readonly cache: CacheService,
        private readonly store: Store
    ) {}

    // ngrxOnInitEffects(): Action {
    //     return GlobalActions.getCart();
    // }

    login$ = createEffect(()=> this.actions$.pipe(
        ofType(GlobalActions.signIn),
        exhaustMap(action => 
            this.netWorkHelper.post<token,auth >('/auth/login', action.user).pipe(
                map(tok => {
                    const data: any = extractToken(tok.token);
                    const user: User = { id: data['sub'], username: data['user'], token: tok.token}
                    this.cache.saveUserData(user);
                    return GlobalActions.signInSuccess({user: user});
                }),
                catchError(error => of(GlobalActions.signInError(error)))
            )
        )
    ));

    logout$ =  createEffect(() => this.actions$.pipe(
        ofType(GlobalActions.logOut),
        tap(() => this.cache.clearUserData())
    ), { dispatch: false });

    getCart$ = createEffect(() => this.actions$.pipe(
        ofType(GlobalActions.getCart),
        withLatestFrom(this.store.select(GlobFeature.selectUser)),
        switchMap(([props, user]) => {
            // console.log(props, user);
            return this.netWorkHelper.get<Cart[]>(`/carts/user/${user?.id}`).pipe(
                map(resp =>GlobalActions.getCartSuccess({cart: resp})),
                catchError( error => {
                    console.log(error);
                    return of(GlobalActions.getCartSuccess({cart: []}));
                })
            )
        })
    ))

    getActualProduct$ = createEffect(() => this.actions$.pipe(
        ofType(GlobalActions.getProductInfo),
        mergeMap((props) => this.netWorkHelper.get<ProductModel>(`/products/${props.id}`).pipe(
            map((data) => GlobalActions.getProductInfoSuccess({product: data})),
            catchError(error => {
                console.log(error);
                return of(GlobalActions.getProductInfoError({message: error.error['message'], id: props.id}));
            })
        ))
    ))

}

const extractToken = (token: string) => JSON.parse(atob(token.split('.')[1]));
