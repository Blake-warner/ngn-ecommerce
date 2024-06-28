import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product";
import * as CONSTANTS from '../../shared/constants';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public products: Product[] = [];
    public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
    constructor(private http: HttpClient) {

    }

    fetchProducts() {
        return this.http.get<Product[]>(CONSTANTS.PRODUCTS_ENDPOINT);
    }

    fetchProductsById(id: number) {
        return this.http.get<Product>(CONSTANTS.PRODUCT_ENDPOINT+'/'+id);
    }

    saveProduct(product: Product) {
        return this.http.post<Product>(CONSTANTS.PRODUCTS_ENDPOINT, product);
    }

}