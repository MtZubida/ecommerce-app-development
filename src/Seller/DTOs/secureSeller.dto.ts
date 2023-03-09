import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";
import { Double } from "typeorm";

export class SecureSellerDTO{

    Name:string;
    Email:string;
    Phone:string;
    Username:string;
    Blocked:boolean;
    filename: string
    Wallet: number
    Star:number
    TotalReviewer:number

}