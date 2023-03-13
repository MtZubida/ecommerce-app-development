import{Length,IsInt,validate, Contains, MinLength, MaxLength, IsDate, IsEmail, IsNotEmpty} from 'class-validator';

export class AdminForm {   
   

    @IsNotEmpty()
     name: string;
    
    @IsEmail() 
     email: string;
 
     @Length(3,8)
     password: string;
 
  
     address: string;
     filename:string;
 
 
 }
 





