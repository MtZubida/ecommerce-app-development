import { Body, Controller, DefaultValuePipe, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseBoolPipe, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ModeratorService } from "./moderator.service";
import { ModeratorDTO } from "./DTOs/moderator.dto";
import { EditModeratorDTO } from "./DTOs/editModerator.dto";
import { ProcessedReportService } from "src/ProcessedReport/processedReport.services";
import { FileInterceptor } from "@nestjs/platform-express";
import { distinct } from "rxjs";
import { diskStorage } from "multer";

@Controller("/moderator")
export class ModeratorController {

    constructor(private moderatorService: ModeratorService,
        private processedReportService: ProcessedReportService
        ){}

    // @Get('/index')
    // Index(): any {
    //     return this.moderatorService.getIndex();
    // }

    // @Get('/getSecure')
    // getModeratorSecure(): any {
    //     return this.moderatorService.getAllSecureData();
    // }

    // @Get('/getAll')
    // getModerators(): any {
    //     return this.moderatorService.getAll();
    // }

    // @Get("/search/:id")
    // searchById(@Param('id', ParseIntPipe) id:number){
    //     return this.moderatorService.searchById(id);
    // }

    // @Get("/register/readAgreement")
    // readTurmsAndConditions(@Query ('read', ParseBoolPipe)read?:boolean){
    //     return this.moderatorService.readTurmsAndConditions(read);
    // }

    // @Get("search/s/:username")
    // searchByUsername(@Param('username',) username:string){
    //     return this.moderatorService.searchByUsername(username);
    // }

    // @Put("/login")
    // addModerator(
    //     @Body("username") username:string,
    //     @Body("password") password:string
    // ){
    //     return this.moderatorService.login(username, password);
    // }

    // @Post("/register")
    // @UsePipes(new ValidationPipe())
    // register(@Body() moderatorDTO: ModeratorDTO): any{
    //     return this.moderatorService.register(moderatorDTO);
    // }

    // @Post("/editProfile/:id")
    // @UsePipes(new ValidationPipe())
    // editProfile( @Body() editModeratorDTO: EditModeratorDTO, @Param('id', ParseIntPipe) id: number): any{
    //     return this.moderatorService.editModerator(editModeratorDTO, id); 
    // }

    // @Delete('delete/:id')
    // deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
    //     return this.moderatorService.deleteModeratorById(id);
    // }

    // @Patch('block/:id')
    // blockModerator(@Param('id', ParseIntPipe) id: number): any{
    //     return this.moderatorService.blockModeratorById(id);
    // }

    // @Get("/getReportByModeratorId/:id")
    // getReportByModeratorId(@Param('id', ParseIntPipe) id: number):any{
    //     return this.moderatorService.getReportByModerator(id);
    // }

    @Post('/signup')
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
        new MaxFileSizeValidator({ maxSize: 16000 }),
        new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
      ],
    }),) file: Express.Multer.File){
    
    mydto.filename = file.filename;  
    
    return this.moderatorService.signup(mydto);
    console.log(file)
    }
    





    



    







}

    

