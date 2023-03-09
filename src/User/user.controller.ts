import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { EditModeratorDTO } from "src/Moderator/DTOs/editModerator.dto";
import { EditUserDTO } from "./DTOs/editUser.dto";
import { UserDTO } from "./DTOs/user.dto";
import { SessionGuard } from "./user.guard";
import { UserService } from "./user.service";

@Controller('/User')
export class UserController{
    constructor(private userService: UserService){}

    @Get('/index')
    Index(): any {
        return this.userService.getIndex();
    }

    @Get('/getSecure')
    @UseGuards(SessionGuard)
    getModeratorSecure(): any {
        return this.userService.getAllSecureData();
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getModerators(): any {
        return this.userService.getAll();
    }

    @Get("/search/:id")
    @UseGuards(SessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.userService.searchById(id);
    }

    @Get("search/s/:username")
    @UseGuards(SessionGuard)
    searchByUsername(@Param('username',) username:string){
        return this.userService.searchByUsername(username);
    }

    @Post("/editProfile/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    editProfile( @Body() editModeratorDTO: EditUserDTO, @Param('id', ParseIntPipe) id: number): any{
        return this.userService.editUser(editModeratorDTO, id); 
    }

    @Delete('delete/:id')
    @UseGuards(SessionGuard)
    deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.deleteModeratorById(id);
    }

    @Patch('block/:id')
    @UseGuards(SessionGuard)
    blockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.userService.blockModeratorById(id);
    }

    @Patch('unblock/:id')
    @UseGuards(SessionGuard)
    unblockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.userService.unblockModeratorById(id);
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

    @Get('/logout')
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

    
}