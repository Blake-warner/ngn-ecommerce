import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Product } from '../product';

export const productsFeatureKey = 'products';

export interface State {
  products: Product[],
  isLoading: boolean,
  isCompleted: boolean,
}

export const initialState: State = {
  products: [],
  isLoading: false,
  isCompleted: false,
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.setProducts, (state, {products}) => ({...state, products})),
  on(ProductActions.addProduct, (state, {product}) => ({products: [...state.products, product], isLoading: true, isCompleted: false})),
  on(ProductActions.updateProduct, (state, {index, newProduct}) => ({...state, [index]: newProduct, isLoading: true, isCompleted: false})),
  on(ProductActions.deleteProduct, (state, {index}) => ({products: state.products.splice(index, 1), isLoading: true, isCompleted: false})),
);