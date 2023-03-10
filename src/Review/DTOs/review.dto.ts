import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class ReviewDTO{


    @IsNotEmpty({message:"Provide Review"})
    Review:string;

    @IsOptional()
    ReviewByUsername:string;

    @IsNotEmpty({message:"Please give seller username"})
    ReviewToUsername:string;

    @IsOptional()
    @IsDateString()
    Timestamp:Date;

}