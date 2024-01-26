import { IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { Role } from '../enums/role.enum';

export class SignUpDto {

    @IsEmail()
    email: string;

    @MinLength(10)
    password: string;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    role: Role;

}