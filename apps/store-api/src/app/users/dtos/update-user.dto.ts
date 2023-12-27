import { IsOptional, IsString, IsEnum } from "class-validator";
import { UserRoles } from "../user-roles";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsEnum(UserRoles)
    user_role?: UserRoles;
}