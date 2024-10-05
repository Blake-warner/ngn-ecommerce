import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product";
import * as CONSTANTS from '../../shared/constants';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import * as appStore from '../../store/index';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public products: Product[] = [];
    public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    constructor(private http: HttpClient) {

    }

    fetchProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(CONSTANTS.PRODUCTS_ENDPOINT);
    }

    fetchProductsById<Product>(id: number): Observable<Product> {
        return this.http.get<Product>(CONSTANTS.PRODUCT_ENDPOINT+'/'+id);
    }

    saveProduct(product: Product): Observable<object> {
        return this.http.post<Product>(CONSTANTS.PRODUCTS_ENDPOINT, product);
    }

}