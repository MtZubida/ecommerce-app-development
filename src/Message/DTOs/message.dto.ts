import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class MessageDTO{

    SenderUsername:string;

    @IsNotEmpty({message:"Recever Username can't be empty"})
    ReceverUsername:string;

    @IsDateString()
    Timestamp:Date;

    @IsNotEmpty()
    Message:string;

}