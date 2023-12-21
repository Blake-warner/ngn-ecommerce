import { Category } from "../../categories/category.entity";
import { Attribute } from "../../attributes/attribute.entity";

export class UpdateProductDto {
    title?: string;
    categories?: Category[];
    main_image?: string;
    image_gallery?: string[];
    price?: number;
    sales_prices?: number;
    attributes?: Attribute[];
}
