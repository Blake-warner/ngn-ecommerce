import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { UserRoles } from './user-roles';

@Entity()
export class User {
    constructor(){}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        type: "enum",
        enum: UserRoles,
        default: UserRoles.CUSTOMER
    })
    role: UserRoles
    
}