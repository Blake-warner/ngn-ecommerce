import { IsOptional, IsString, IsEnum } from "class-validator";
import { Roles } from "../roles";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsEnum(Roles)
    user_role?: Roles;
}