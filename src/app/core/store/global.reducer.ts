import { createFeature, createReducer, on } from "@ngrx/store";
import { Cart, User } from "../models";
import { GlobalActions } from "./global.action";
// import { Cart } from "../models/cart.model";
// import {User } from "../models/user.model";




interface State {
    user: User | null;
    cart: Cart[];
    isLoggedIn: boolean;
    isLoginLoading: boolean;
    isSignUpLoading: boolean
    isAuthModalOpen: boolean
}
   
const initialState: State = {
    user: null,
    cart: [],
    isLoggedIn: false,
    isLoginLoading: false,
    isSignUpLoading: false,
    isAuthModalOpen: false
};


 
export const GlobFeature = createFeature({
    name: 'glob',
    reducer: createReducer(
        initialState,
        on(GlobalActions.signIn, (state) => ({...state, isLoginLoading: true,})),
        on(GlobalActions.signInSuccess, (state, props)=> ({...state, isLoginLoading: false, user: props.user, isLoggedIn: true, isAuthModalOpen: false})),
        on(GlobalActions.signInError, (state) => ({...state, isLoginLoading: false,})),
        on(GlobalActions.signUp, (state) => ({...state, isSignUpLoading: true})),
        on(GlobalActions.signUpSuccess, (state, props)=> ({...state, isSignUpLoading: false, user: props.user, isAuthModalOpen: false})),
        on(GlobalActions.signUpError, (state) => ({...state, isSignUpLoading: false,})),
        on(GlobalActions.toggleAuthModal, (state, {status}) => ({...state,isAuthModalOpen: status})),
    ),
  });
   