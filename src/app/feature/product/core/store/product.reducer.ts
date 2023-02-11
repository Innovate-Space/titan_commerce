import { createFeature, createReducer, on } from "@ngrx/store";
import { ProductModel } from "src/app/core/models";
import { ProductActions } from "./product.action";

interface State {
    products: ProductModel[]
    isProductsLoading: boolean;
    fakeProduct : any[]
    pagedProduct : {[id: number]: ProductModel[]}
}
   
const initialState: State = {
    products : [],
    pagedProduct: {},
    isProductsLoading: false,
    fakeProduct : new Array(4)
};


 
export const ProductsFeature = createFeature({
    name: 'product',
    reducer: createReducer(
        initialState,
        on(ProductActions.getallproducts, (state) => ({...state, isProductsLoading: true,})),
        on(ProductActions.getallproductssuccess, (state , {products}) => ({...state, isProductsLoading: false, products })),
        on(ProductActions.getproductsfailure, (state) => ({...state, isProductsLoading: false,})),
        on(ProductActions.getpaginatedproduct, (state, {page, pageCount})=> {
            const offSet = page * pageCount;
            const limit =  offSet + 4;
            const productList = [];
            for(let i = offSet; i < limit; i++){
                if(i >= state.products.length ) break;
                productList.push(state.products[i]);
            }
            return ({...state,pagedProduct: {...state.pagedProduct, [page]: productList}  })
        })
    ),
  });
   