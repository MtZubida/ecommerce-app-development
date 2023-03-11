import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class ProductDTO{

    @IsNotEmpty({message:"Product name can't be empty"})
    ProductName:string;

    @IsOptional()
    @IsDateString()
    PublishedDate:Date;


    @IsNotEmpty({message:"Ammount can't be empty"})
    Price:number;

    @IsNotEmpty({message:"Disctiption can't be empty"})
    Discription:string;

    @IsNotEmpty({message:"SellerUsername can't be empty"})
    SellerUsername:string;

    @IsNotEmpty({message:"Quantity can't be empty"})
    Quantity:number;

    SelledQuantity:number;

    @IsNotEmpty()
    filename: string

}