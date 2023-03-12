import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { EditModeratorDTO } from "./DTOs/editModerator.dto";
import { ModeratorDTO } from "./DTOs/moderator.dto";
import { ModeratorService } from "./moderator.service";
import { SessionGuard } from "./session.guard";
import { AdminSessionGuard } from "../Admin/admin.guard"

@Controller('/moderator')
export class ModeratorController{
    constructor(private moderatorService: ModeratorService){}

    @Get('/index')
    Index(): any {
        return this.moderatorService.getIndex();
    }

    @Get('/getSecure')
    @UseGuards(AdminSessionGuard)
    getModeratorSecure(): any {
        return this.moderatorService.getAllSecureData();
    }

    @Get('/getAll')
    @UseGuards(AdminSessionGuard)
    getModerators(): any {
        return this.moderatorService.getAll();
    }

    @Get("/search/:id")
    @UseGuards(AdminSessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.moderatorService.searchById(id);
    }

    @Get("search/s/:username")
    @UseGuards(AdminSessionGuard)
    searchByUsername(@Param('username',) username:string){
        return this.moderatorService.searchByUsername(username);
    }

    @Post("/editProfile/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    editProfile( @Body() editModeratorDTO: EditModeratorDTO, @Param('id', ParseIntPipe) id: number): any{
        return this.moderatorService.editModerator(editModeratorDTO, id); 
    }

    @Delete('delete/:id')
    @UseGuards(AdminSessionGuard)
    deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
        return this.moderatorService.deleteModeratorById(id);
    }

    @Patch('block/:id')
    @UseGuards(AdminSessionGuard)
    blockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.moderatorService.blockModeratorById(id);
    }

    @Patch('unblock/:id')
    @UseGuards(AdminSessionGuard)
    unblockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.moderatorService.unblockModeratorById(id);
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
    signup(@Body() mydto:ModeratorDTO,@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        mydto.filename = file.filename;  
        mydto.Blocked = false;
        return this.moderatorService.signup(mydto);
    }

    @Put("/login")
    async addModerator( @Session() session,
        @Body("username") username:string,
        @Body("password") password:string
    ){
        if(await this.moderatorService.login(username, password) == 1){
            session.username = username;
            session.role = "moderator";
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