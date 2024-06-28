import { Attribute } from "@angular/core";
import { ProductCategory } from './product-categories/product-category';

export interface Product {
    id: number;
    sku: number,
    title: string,
    price: number,
    description: number,
    attributes: Attribute[],
    sales_price?: number,
    categories?: ProductCategory[],
    main_image?: string,
    image_gallery?: string[]
}