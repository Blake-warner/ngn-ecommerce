import { Product } from "./product";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import * as appStore from '../../store/index';
import { Subscription, exhaustMap, of, switchMap, take } from "rxjs";
import { ProductActions } from "./store/product.actions";
import { Actions, ofType } from '@ngrx/effects';
import { ProductsService } from "./products.service";

export const productsResolver: ResolveFn<Product[]> = () => {
    const productsService = inject(ProductsService);
    return productsService.fetchProducts();
   /* const store = inject(Store<appStore.State>);
    const actions = inject(Actions);
    const productStore = store.select(appStore.selectProducts);
    return productStore.pipe(
        switchMap((products: Product[]) => {
            console.log(products);
            if(products.length === 0) {
                    console.log('rpdoduts length 0');
                    store.dispatch(ProductActions.fetchProducts());
                    //return products;
                    return of(products)
            } else {
                //return products;
                return of(products);
            }
        }),

    )
    */
}