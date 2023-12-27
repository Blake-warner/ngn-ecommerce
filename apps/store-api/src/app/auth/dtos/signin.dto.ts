import {IsEnum, IsEmail, IsNotEmpty, IsString} from "class-validator";
import { UserRoles } from "../../users/user-roles";

export class SigninDto {

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

    @IsEnum(UserRoles)
    user_role?: UserRoles;
}