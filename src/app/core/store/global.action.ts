import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';
 
export const GlobalActions = createActionGroup({
  source: 'Global App',
  events: {

    'Sign In': props<{user: {username:string, password: string}}>(),

    'Sign Up': props<{user: {username:string, password: string}}>(),

    'Sign In Success': props<{user:User}>(),

    'Sign In Error': props<{message: string}>(),

    'Sign Up Success': props<{user:User}>(),

    'Sign Up Error': props<{message: string}>(),
    
  }
});