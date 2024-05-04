import { Attribute } from "@angular/core";

export class Product {
    constructor(
        public id: number,
        public sku: number,
        public title: string,
        public price: number,
        public sales_price: number,
        public attributes: Attribute[],
        public mainImage: string
    ) {}
}