
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { NetworkHelperService } from '../api/network-helper.service';
import { User } from '../models';
import { GlobalActions } from './global.action';

type auth  = {username: string, password: string};
type token = {token: string};

@Injectable()
export class AuthEffects {

    constructor(private readonly actions$: Actions, private readonly netWorkHelper: NetworkHelperService) {}

    login$ = createEffect(()=> this.actions$.pipe(
        ofType(GlobalActions.signIn),
        exhaustMap(action => 
            this.netWorkHelper.post<token,auth >('/auth/login', action.user).pipe(
                map(tok => {
                    const data: any = extractToken(tok.token);
                    alert(JSON.stringify(data))
                    const user: User = { id: data['sub'], username: data['user'], token: tok.token}
                    return GlobalActions.signInSuccess({user: user})
                }),
                catchError(error => of(GlobalActions.signInError(error)))
            )
        )
    ));

}

const extractToken = (token: string) => JSON.parse(atob(token.split('.')[1]));