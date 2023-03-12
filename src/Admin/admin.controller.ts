import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./DTOs/admin.dto";
import { EditAdminDTO } from "./DTOs/editAdmin.dto";
import { AdminSessionGuard } from "./admin.guard";

@Controller("/admin")
export class AdminController{

    constructor(private adminService: AdminService){}
    
    @Get('/index')
    Index(): any {
        return this.adminService.getIndex();
    }

    @Get('/getSecure')
    @UseGuards(AdminSessionGuard)
    getModeratorSecure(): any {
        return this.adminService.getAllSecureData();
    }

    @Get('/getAll')
    @UseGuards(AdminSessionGuard)
    getModerators(): any {
        return this.adminService.getAll();
    }

    @Get("/search/:id")
    @UseGuards(AdminSessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.adminService.searchById(id);
    }

    @Get("search/s/:username")
    @UseGuards(AdminSessionGuard)
    searchByUsername(@Param('username',) username:string){
        return this.adminService.searchByUsername(username);
    }

    @Post("/editProfile/:id")
    @UseGuards(AdminSessionGuard)
    @UsePipes(new ValidationPipe())
    editProfile( @Body() editModeratorDTO: EditAdminDTO, @Param('id', ParseIntPipe) id: number): any{
        return this.adminService.editModerator(editModeratorDTO, id); 
    }

    @Delete('delete/:id')
    @UseGuards(AdminSessionGuard)
    deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.deleteModeratorById(id);
    }

    @Patch('block/:id')
    @UseGuards(AdminSessionGuard)
    blockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.adminService.blockModeratorById(id);
    }

    @Patch('unblock/:id')
    @UseGuards(AdminSessionGuard)
    unblockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.adminService.unblockModeratorById(id);
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
    signup(@Body() mydto:AdminDTO,@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        mydto.filename = file.filename;  
        mydto.Blocked = false;
        return this.adminService.signup(mydto);
    }

    @Put("/login")
    async addModerator( @Session() session,
        @Body("username") username:string,
        @Body("password") password:string
    ){
        if(await this.adminService.login(username, password) == 1){
            session.username = username;
            session.role = "admin";
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