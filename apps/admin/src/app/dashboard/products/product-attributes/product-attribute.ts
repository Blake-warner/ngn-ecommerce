import { Product } from "../product";

export class Attribute {
    constructor(
        public id: number,
        public slug: string,
        public name: string,
        public product: Product,
    ) {}
}