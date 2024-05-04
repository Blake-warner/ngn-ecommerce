export interface ProductCategory {
    id: number,
    title: string,
    children?: ProductCategory[],
    parent?: ProductCategory
}