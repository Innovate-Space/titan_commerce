import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductModel } from "src/app/core/models";
import { HomeActions } from "./home.actions";

interface State {
    products: ProductModel[]
    isProductsLoading: boolean;
    fakeProduct : any[]
}
   
const initialState: State = {
   products : [],
   isProductsLoading: false,
   fakeProduct : new Array(8)
};


 
export const HomeFeature = createFeature({
    name: 'home',
    reducer: createReducer(
        initialState,
        on(HomeActions.getallproducts, (state) => ({...state, isProductsLoading: true,})),
        on(HomeActions.getallproductssuccess, (state , {products}) => ({...state, isProductsLoading: false, products })),
        on(HomeActions.getproductsfailure, (state) => ({...state, isProductsLoading: false,})),
    ),
  });
   