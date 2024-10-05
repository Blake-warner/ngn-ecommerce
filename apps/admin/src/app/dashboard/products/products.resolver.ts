import { Product } from "./product";
import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import * as appStore from '../../store/index';
import { Subscription, catchError, exhaustMap, of, switchMap, take } from "rxjs";
import { ProductActions } from "./store/product.actions";
import { Actions, ofType } from '@ngrx/effects';
import { ProductsService } from "./products.service";

export const productsResolver: ResolveFn<Product[]> = () => {
  /* const productsService = inject(ProductsService);
    return productsService.fetchProducts().pipe(
        catchError(() => {
            return of('No Products')
        })
    );
    */
    const store = inject(Store<appStore.State>);
    const actions = inject(Actions);
    const productStore = store.select(appStore.selectProducts);
    console.log(productStore);
    return productStore.pipe(
        switchMap((products: any) => {
            console.log(products);
            if(products.length === 0) {
                store.dispatch(ProductActions.fetchProducts());
               /* return store.select(appStore.selectProducts).subscribe((products) => {
                    console.log(products);
                    return products;
                });*/
                return store.select(appStore.selectProducts).pipe((products) => {
                    console.log(products);
                    return products;
                })
            } else {
                //return products;
                return of(products);
            }
        }),
    )
}