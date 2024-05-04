import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Product } from '../product';

export const productsFeatureKey = 'products';

export interface State {
  products: Product[]
}

export const initialState: State = {
  products: []
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.setProducts, (state, {products}) => ({...state, ...products})),
  on(ProductActions.addProduct, (state, {product}) => ({...state, product})),
  on(ProductActions.updateProduct, (state, {index, newProduct}) => ({...state, [index]: newProduct})),
  on(ProductActions.deleteProduct, (state, {index}) => ({products: state.products.splice(index, 1)})),
);