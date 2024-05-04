import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as CONSTANTS from '../../../shared/constants';
import { BehaviorSubject } from "rxjs";
import { ProductCategory } from "./product-category";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoriesService {
    public productCategoires: ProductCategory[] = [];
    public productCategories$: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
    constructor(private http: HttpClient) {

    }

    fetchProductCategories() {
        return this.http.get<ProductCategory[]>(CONSTANTS.CATEGORIES_ENDPOINT);
    }
}