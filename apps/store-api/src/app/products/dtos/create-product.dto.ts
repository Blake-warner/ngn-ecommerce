import { Attribute } from "../../attributes/attribute.entity";
import { Category } from "../../categories/category.entity";

export class CreateProductDto {
    title: string;
    categories?: Category[];
    main_image?: string;
    image_gallery?: string[];
    price?: number;
    sales_prices?: number;
    attributes?: Attribute[];
}