import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class DepositOrWithdrawlDTO{

    @IsOptional()
    SenderUsername:string;

    @IsOptional()
    ReceiverUsername:string;

    @IsNotEmpty({message:"Please provide Ammount"})
    Ammount:number;

    @IsOptional()
    Discription:string;

    @IsOptional()
    @IsDateString()
    Timestamp:Date;

}