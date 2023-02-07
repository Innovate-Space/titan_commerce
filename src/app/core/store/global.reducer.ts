import { state } from "@angular/animations";
import { createFeature, createReducer, on } from "@ngrx/store";
import { Cart, ProductModel, User } from "../models";
import { GlobalActions } from "./global.action";
// import { Cart } from "../models/cart.model";
// import {User } from "../models/user.model";




interface State {
    user: User | null;
    cart: Cart[];
    isLoggedIn: boolean;
    isLoginLoading: boolean;
    isSignUpLoading: boolean;
    isAuthModalOpen: boolean;
    isCartLoading: boolean;
    cartProducts : {[id: number] : ProductModel}
    cartProductsLoading : {[id: number] : boolean} 
}
   
const initialState: State = {
    user: null,
    cart: [],
    isLoggedIn: false,
    isLoginLoading: false,
    isSignUpLoading: false,
    isAuthModalOpen: false,
    isCartLoading: false,
    cartProducts: {},
    cartProductsLoading: {}
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
        on(GlobalActions.logOut, (state) => ({...state, ...initialState}) ),
        on(GlobalActions.rehydratedTheUser, (state, {user})=> ({...state, ...initialState, user: user, isLoggedIn: true })),
        on(GlobalActions.getCartSuccess, (state, {cart}) => ({...state, cart: cart, isCartLoading: false}) ),
        on(GlobalActions.getCart, (state) => ({...state, isCartLoading: true})),
        on(GlobalActions.getProductInfo, (state, {id}) =>({...state, cartProductsLoading: {...state.cartProductsLoading, [id]:true }})),
        on(GlobalActions.getProductInfoSuccess, (state, {product}) =>({...state, cartProducts: {...state.cartProducts,[product.id]: product } ,cartProductsLoading: {...state.cartProductsLoading, [product.id]:false }})),
        on(GlobalActions.getProductInfoError, (state, {id}) =>({...state, cartProductsLoading: {...state.cartProductsLoading, [id]:false }}))
    ),
  });
   