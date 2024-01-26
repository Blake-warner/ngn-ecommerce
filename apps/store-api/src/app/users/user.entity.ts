import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Role } from '../iam/authentication/enums/role.enum';

@Entity()
export class User {
    constructor(){}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.CUSTOMER
    })
    role: Role;
    
}