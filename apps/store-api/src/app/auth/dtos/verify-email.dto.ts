import { IsNumber, IsEmail, IsNotEmpty } from "class-validator";

export class VerifyEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    code: number;
    
}