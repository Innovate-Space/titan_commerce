import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart, ProductModel, User } from '../models';
 
export const GlobalActions = createActionGroup({
  source: 'Global App',
  events: {

    'Sign In': props<{user: {username:string, password: string}}>(),

    'Sign Up': props<{user: {username:string, password: string}}>(),

    'Sign In Success': props<{user:User}>(),

    'Sign In Error': props<{message: string}>(),

    'Sign Up Success': props<{user:User}>(),

    'Sign Up Error': props<{message: string}>(),

    'Log Out': emptyProps(),

    'get Cart': emptyProps(),

    'Get Cart Success': props<{cart : Cart[]}>(),

    'Toggle Auth Modal': props<{status: boolean}>(),

    'Rehydrated The User': props<{user:User}>(),

    'Do nothing': emptyProps(),

    'Get Product Info': props<{id: number}>(),

    'Get Product Info Success': props<{product: ProductModel}>(),

    'Get Product Info Error': props<{message: string, id: number}>(),
    
  }
});