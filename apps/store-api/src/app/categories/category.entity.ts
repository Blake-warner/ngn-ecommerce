import { Entity, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, ManyToMany, Tree } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
@Tree("closure-table")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[]
}