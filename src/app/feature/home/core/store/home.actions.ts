import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductModel } from 'src/app/core/models';
 
export const HomeActions = createActionGroup({
  source: 'Home Products',
  events: {

    getAllProducts: emptyProps(),

    getAllProductsSuccess: props<{products: ProductModel[]}>(),

    getProductsFailure: props<{message: string}>(),
    
  }
});