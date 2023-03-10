import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class CouponDTO{

    @IsOptional()
    AdminUsername:string;

    @IsNotEmpty({message:"Please provide Ammount"})
    Ammount:Number;

    @IsNotEmpty({message:"Please provide a Discription"})
    Discription:string;

    @IsOptional()
    @IsDateString()
    Timestamp:Date;

    @IsNotEmpty()
    Useability:number;

}