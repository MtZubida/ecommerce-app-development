import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";
import { Double } from "typeorm";

export class SecureUserDTO{

    Firstname:string;
    Lastname:string;
    DOB:Date;
    Email:string;
    Phone:string;
    Username:string;
    filename: string;
    Wallet:number;
}