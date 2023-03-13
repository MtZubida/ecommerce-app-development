import { IsNotEmpty, IsInt, Length, IsEmail, MinLength, MaxLength } from "class-validator";

export class SellerForm {   
   

    @Length(2,10)
    sname:string;
    @IsEmail()
    email:string;
   
    phn:number;
    gender:string;
    religion:string;
    @MinLength(5,{message:'address is too short',})
    @MaxLength(20,{message:'address is long',})
    address:string;
    adminname:string;


}