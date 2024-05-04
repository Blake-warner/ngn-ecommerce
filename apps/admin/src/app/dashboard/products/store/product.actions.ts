import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product';

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    'Set Products': props<{ 
      products: Product[]
    }>(),
    'Fetch Products': emptyProps(),
    'Update Product': props<{ 
      index: number,
      newProduct: Product,
    }>(),
    'Delete Product': props<{
       index: number,
    }>(),
    'Add Product': props<{ 
      product: Product,
    }>(),
  }
});