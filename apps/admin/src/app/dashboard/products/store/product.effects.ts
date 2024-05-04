import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, exhaustMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../../../shared/constants';
import { Product } from '../product';


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
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private http: HttpClient,
    ) {}

    fetchProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductActions.fetchProducts),
        exhaustMap(() => {
            console.log('fetch products called');
            return this.http.get<Product[]>(CONSTANTS.PRODUCTS_ENDPOINT).pipe(
                map(products => {
                    console.log(products);

                    return ProductActions.setProducts({products})
                })
            );
        }),
    ),);
}

