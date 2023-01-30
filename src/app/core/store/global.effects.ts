
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { NetworkHelperService } from '../api/network-helper.service';
import { User } from '../models';
import { CacheService } from '../services/cache.service';
import { GlobalActions } from './global.action';

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
        })
    ))

    constructor(private readonly actions$: Actions, private readonly netWorkHelper: NetworkHelperService, private readonly cache: CacheService) {}

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
    ), { dispatch: false })

}

const extractToken = (token: string) => JSON.parse(atob(token.split('.')[1]));
