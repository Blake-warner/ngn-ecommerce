import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as CONSTANTS from '../../../shared/constants';
import { BehaviorSubject } from "rxjs";
import { ProductCategory } from "./product-category";

interface NewCategory {
    title: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductCategoriesService {
    public productCategories: ProductCategory[] = [];
    public productCategories$: BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>([]);
    constructor(private http: HttpClient) {

    }

    fetchProductCategories() {
        return this.http.get<ProductCategory[]>(CONSTANTS.CATEGORIES_ENDPOINT);
    }

    fetchProductCategoryTree() {
        return this.http.get<object[]>(CONSTANTS.CATEGORY_TREE_ENDPOINT);
    }

    createCategory(category: NewCategory) {
        return this.http.post<ProductCategory>(CONSTANTS.CATEGORIES_ENDPOINT, category);
    }
}