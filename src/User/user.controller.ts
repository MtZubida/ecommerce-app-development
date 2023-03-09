import { Body, Controller, FileTypeValidator, Get, ParseFilePipe, Post, Put, Session, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UserDTO } from "./DTOs/user.dto";
import { UserService } from "./user.service";

@Controller('/User')
export class UserController{
    constructor(private userService: UserService){}

    @Get('/index')
    Index(): any {
        return this.userService.getIndex();
    }





    @Post('/register')
    @UseInterceptors(FileInterceptor('myfile',
    {storage:diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })

    }))
    signup(@Body() mydto:UserDTO,@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        mydto.filename = file.filename;  
        mydto.Blocked = false;
        mydto.Wallet = 0.0;
        return this.userService.signup(mydto);
    }

    @Put("/login")
    async addModerator( @Session() session,
        @Body("username") username:string,
        @Body("password") password:string
    ){
        if(await this.userService.login(username, password) == 1){
            session.username = username;
            return {message:"Successfully logged"};
        }
        else{
            return {message:"Invalid username or password"};
        }
    }

    
}