import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductModel } from 'src/app/core/models';
 
export const ProductActions = createActionGroup({
  source: 'Products List Page',
  events: {

    getAllProducts: emptyProps(),

    getAllProductsSuccess: props<{products: ProductModel[]}>(),

    getProductsFailure: props<{message: string}>(),

    getPaginatedProduct: props<{page: number, pageCount: number}>()
    
  }
});