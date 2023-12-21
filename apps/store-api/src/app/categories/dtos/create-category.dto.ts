
export class CreateCategoryDto {
    title: string;
    parent?: {title: string};
}