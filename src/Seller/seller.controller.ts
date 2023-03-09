import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UserDTO } from "src/User/DTOs/user.dto";
import { EditSellerDTO } from "./DTOs/editSeller.dto";
import { SellerDTO } from "./DTOs/seller.dto";
import { SellerService } from "./seller.service";
import { SessionGuard } from "./session.guard";

@Controller('/seller')
export class SellerController{
    constructor(private sellerService: SellerService){}

    @Get('/index')
    Index(): any {
        return this.sellerService.getIndex();
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getModerators(): any {
        return this.sellerService.getAll();
    }

    @Get("/search/:id")
    @UseGuards(SessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.sellerService.searchById(id);
    }

    @Get("search/s/:username")
    @UseGuards(SessionGuard)
    searchByUsername(@Param('username',) username:string){
        return this.sellerService.searchByUsername(username);
    }

    @Post("/editProfile/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    editProfile( @Body() editModeratorDTO: EditSellerDTO, @Param('id', ParseIntPipe) id: number): any{
        return this.sellerService.editUser(editModeratorDTO, id); 
    }

    @Delete('delete/:id')
    @UseGuards(SessionGuard)
    deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
        return this.sellerService.deleteModeratorById(id);
    }

    @Patch('block/:id')
    @UseGuards(SessionGuard)
    blockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.sellerService.blockModeratorById(id);
    }

    @Patch('unblock/:id')
    @UseGuards(SessionGuard)
    unblockModerator(@Param('id', ParseIntPipe) id: number): any{
        return this.sellerService.unblockModeratorById(id);
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
    signup(@Body() mydto:SellerDTO,@UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
        mydto.filename = file.filename;  
        mydto.Blocked = false;
        mydto.Wallet = 0.0;
        mydto.Star = 0.0;
        mydto.TotalReviewer = 0;
        return this.sellerService.signup(mydto);
    }


    @Put("/login")
    async addModerator( @Session() session,
        @Body("username") username:string,
        @Body("password") password:string
    ){
        if(await this.sellerService.login(username, password) == 1){
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