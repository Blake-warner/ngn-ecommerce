import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { ProductActions } from './product.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import * as CONSTANTS from '../../../shared/constants';
//import { Product } from '../product';
import { ProductsService } from '../products.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private http: HttpClient,
        private productsService: ProductsService,
    ) {}

    fetchProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.fetchProducts),
        exhaustMap(() => {
            console.log('fetch products called');
            return this.productsService.fetchProducts().pipe(
                map(products => {
                    console.log('products from effect: ', products);
                    return ProductActions.setProducts({products});
                })
            )
        }),
    ));
}