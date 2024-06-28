import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Attribute } from '../attributes/attribute.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryGeneratedColumn('uuid')
    sku: number;

    @Column()
    title: string;

    @ManyToMany(() => Category)
    @JoinTable({
        name: 'product_categories'
    })
    categories: Category[];

    @Column()
    main_image: string;

   // @Column({ nullable: true, array: true, type: "simple-array"})
    //image_gallery: string[];

    @Column({ nullable: false, type: "float", default: 0.0 })
    price: number;
dfc                                   
    @Column({ nullable: false, type: "float",  default: 0.0 })
    sales_price: number;

    @OneToMany(() => Attribute, (attribute) => attribute.product)
    attributes: Attribute[]
    

}