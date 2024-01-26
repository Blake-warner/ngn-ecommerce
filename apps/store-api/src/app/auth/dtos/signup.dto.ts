import {IsEnum, IsEmail, IsNotEmpty, IsString} from "class-validator";
import { Roles } from "../../users/roles";

export class SignupDto {

    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    first_name?: string;

    @IsString()
    last_name?: string;

    @IsEnum(Roles)
    role?: Roles;
}