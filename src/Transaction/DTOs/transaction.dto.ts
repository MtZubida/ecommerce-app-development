import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class TransactionDTO{

    @IsOptional()
    SenderUsername:string;

    @IsNotEmpty({message:"Enter receiver username"})
    ReceiverUsername:string;

    @IsNotEmpty({message:"Please provide Ammount"})
    Ammount:Number;

    @IsNotEmpty({message:"Please provide a Discription"})
    Discription:string;

    @IsOptional()
    @IsDateString()
    Timestamp:Date;

}