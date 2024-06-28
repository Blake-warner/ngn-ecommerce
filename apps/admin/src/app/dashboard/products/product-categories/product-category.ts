export interface ProductCategory {
    id: number,
    title: string,
    description: string,
    children: ProductCategory[],
    parent?: ProductCategory
}