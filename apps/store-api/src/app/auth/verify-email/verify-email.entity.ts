import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class VerifyEmail {

    @PrimaryColumn()
    email: string;

    @Column()
    code: number;

}