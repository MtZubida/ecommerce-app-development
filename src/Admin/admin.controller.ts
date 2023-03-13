import { Controller, Get, Param, ParseIntPipe, Query ,Post ,Body ,Put,Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Session, UseGuards, Patch} from '@nestjs/common';
import { AdminService} from './adminservice.service';
import { AdminForm } from "./adminlogin.dto";
import { SellerService } from '../sellerfile/seller.service';
import { SellerForm } from '../sellerfile/seller.dto';
import { ModeratorService } from '../moderatorfile/moderator.service';
import { ModeratorForm } from '../moderatorfile/moderator.dto';
//import { Categoryinfo } from "./categoryinfo.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SessionGuard } from './session.guard';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SellerEntity } from '../sellerfile/seller.entity';

@Controller()
export class AdminController{
      constructor(private readonly adminService: AdminService ,private sellerService: SellerService,private moderatorService:ModeratorService) {}
     


    //seller area

     @Get("/sinfo/:id")
     getseller(@Param('id', ParseIntPipe) id: number):any{
       return this.sellerService.getseller(id);
     }
     @Get('/findsellerbyadmin/:id')
     getsellerByAdminID(@Param('id', ParseIntPipe) id: number): any {
       return this.adminService.getsellersByAdminID(id);
     }
     @Get('/findadminbyseller/:id')
     getAdminBysellerID(@Param('id', ParseIntPipe) id: number): any {
       return this.sellerService.getAdminBysellerID(id);
     }
     @Get("/seler")
     getsel():any{
       return this.sellerService.getsel();
     }

     @Post("/sellerinfo")
     @UsePipes(new ValidationPipe())
     insertseller(@Body() mydto1:SellerForm): any {
      //mydto1.adminname = session.username;
       return this.sellerService.insertseller(mydto1);
     } 

     

     @Put("/updateseller/")
     //@UsePipes(new ValidationPipe())
     updateseller( 
       @Body("id") id:number, 
       @Body("sname") sname:string,
       @Body("email") email:number,
       @Body("phn") phn:number,
       @Body("gender") gender:string,
       @Body("religion") religion:string,
       @Body("address") address:string,
       ): any {
     return this.sellerService.updateseller(id, sname,email,phn,gender,religion,address);
     }
     @Put('/updateseller/:id')
  @UsePipes(new ValidationPipe())
  updatesellerbyid(
    @Body() mydto: SellerForm,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.sellerService.updatesellerbyid(mydto, id);
  }
     @Delete("/deleteseller/:id")
   deletesellerbyid( 
      @Param("id") id:number
       ): any {
     return this.sellerService.deletesellerbyid(id);
     }

     //admin file
     /*@Post('/insertadmin')
     @UsePipes(new ValidationPipe())
       insertAdmin(@Body() mydto: AdminForm): any {
         return this.adminService.insertUser(mydto);
       }*/
       @Post('/signupadmin')
       @UsePipes(new ValidationPipe())
       @UseInterceptors(FileInterceptor('myfile',
        {storage:diskStorage({
            destination: './uploads',
             filename: function (req, file, cb) {
             cb(null,Date.now()+file.originalname)
          }
          })

        }))
          signup(@Body() mydto:AdminForm,@UploadedFile(  new ParseFilePipe({
         validators: [
         new MaxFileSizeValidator({ maxSize: 160000 }),
         new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
            }),) file: Express.Multer.File){

        mydto.filename = file.filename;  

         return this.adminService.signup(mydto);
         console.log(file)
       }

       @Get('/signin')
         async signin(@Session() session,  @Body("email") email:string,
         @Body("password") password:string)
         
         {
          if(await this.adminService.signin(email, password) == 1){
              session.email = email;
              session.role = "admin";
              return {message:"Successfully logged"};
          }
          else{
              return {message:"Invalid username or password"};
          }
      }
       

      @Get('/signout')
        signout(@Session() session)
    {
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}


@Post('/sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}
       




       @Get('/findadmin/:id')
       getAdminByIDName(@Param('id', ParseIntPipe) id:number) {
         return this.adminService.getUserByIDName(id);
       }
      
       @Get('/viewadmin')
       getAdminBy(): any {
         return this.adminService.getUser();
       }

       @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: AdminForm,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteUserbyid(id);
   
  }


//moderator area

  @Get("/moinfo/:id")
  getmoderator(@Param('id', ParseIntPipe) id: number):any{
    return this.moderatorService.getmoderator(id);
  }
  @Get("/moderator")
  getmoder():any{
    return this.moderatorService.getmoder();
  }

  @Post("/moderatorinfo")
  @UsePipes(new ValidationPipe())
  insertmoderator(@Body() mydto1:ModeratorForm): any {
    return this.moderatorService.insertmoderator(mydto1);
  } 
  @Put("/updatemoderator/")
  //@UsePipes(new ValidationPipe())
  updatemoderator( 
    @Body("id") id:number, 
    @Body("sname") sname:string,
    @Body("email") email:number,
    @Body("phn") phn:number,
    @Body("gender") gender:string,
    @Body("religion") religion:string,
    @Body("address") address:string,
    ): any {
  return this.moderatorService.updatemoderator(id, sname,email,phn,gender,religion,address);
  }
  @Put('/updatemoderator/:id')
@UsePipes(new ValidationPipe())
updatemoderatorbyid(
 @Body() mydto: ModeratorForm,
 @Param('id', ParseIntPipe) id: number,
): any {
 return this.moderatorService.updatemoderatorbyid(mydto, id);
}
  @Delete("/deletemoderator/:id")
deletemoderatorbyid( 
   @Param("id") id:number
    ): any {
  return this.moderatorService.deletemoderatorbyid(id);
    }
    
}
