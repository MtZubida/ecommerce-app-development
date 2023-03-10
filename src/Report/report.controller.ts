import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReportDTO } from "./DTOs/report.dto";
import { ReportService } from "./report.services";
import { SessionGuard } from "./session.guard";

@Controller('/report')
export class ReportController{
    constructor(private reportsService: ReportService){}
    
    @Post('/add')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto: ReportDTO, @Session() session): any {
            mydto.ReporterUsername = session.username;
            mydto.ModeratorUsername = null;
        return this.reportsService.addReport(mydto);
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getAll(): any {
        return this.reportsService.getAll();
    }

    @Get('/getPartial')
    @UseGuards(SessionGuard)
    getPartial(): any {
        return this.reportsService.getPartial();
    }

    @Get("/search/:id")
    @UseGuards(SessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.reportsService.searchById(id);
    }


    //this will return users who have reported this seller by Id
    @Get("/search/bySellerId/:id")
    @UseGuards(SessionGuard)
    searchBySellerId(@Param('id', ParseIntPipe) id:number){
        return this.reportsService.searchBySellerId(id);
    }

    //This will return all associated with reported seller by Id
    @Get("/search/bySellerId/returnAll/:id")
    @UseGuards(SessionGuard)
    searchBySellerIdReturnAll(@Param('id', ParseIntPipe) id:number){
        return this.reportsService.searchBySellerIdReturnAll(id);
    }

    //previous same thing but instad of username 
    @Get("/search/bySellerUsername/:username")
    @UseGuards(SessionGuard)
    searchBySellerUsername(@Param('username',) username:string){
        return this.reportsService.searchBySellerUsername(username);
    }

    @Get("/search/bySellerUsername/returnAll/:username")
    @UseGuards(SessionGuard)
    searchBySellerUsernameReturnAll(@Param('username',) username:string){
        return this.reportsService.searchBySellerUsernameReturnAll(username);
    }


    //Now
    //Everything get by reported/user

    @Get("/search/byUserId/:id")
    @UseGuards(SessionGuard)
    searchByUserId(@Param('id', ParseIntPipe) id:number){
        return this.reportsService.searchByUserId(id);
    }

    @Get("/search/byUserId/returnAll/:id")
    @UseGuards(SessionGuard)
    searchByUserIdReturnAll(@Param('id', ParseIntPipe) id:number){
        return this.reportsService.searchByUserIdReturnAll(id);
    }

    //Now
    //Everything get by reported/user by username

    @Get("/search/byUserUsername/:username")
    @UseGuards(SessionGuard)
    searchByUserUsername(@Param('username',) username:string){
        return this.reportsService.searchByUserUsername(username);
    }

    @Get("/search/byUserUsername/returnAll/:username")
    @UseGuards(SessionGuard)
    searchByUserUsernameReturnAll(@Param('username',) username:string){
        return this.reportsService.searchByUserUsernameReturnAll(username);
    }

    //Here moderator will hander next procedures
    //Moderator Prodedures
    
    @Get('/getUnprocessedReport')
    @UseGuards(SessionGuard)
    getUnprocessedReport(): any {
        return this.reportsService.getUnprocessedReport();
    }

    @Put("/processReportByModerator/:id")
    @UseGuards(SessionGuard)
    async addModerator( @Session() session,
        @Body("Action") Action:string,
        @Param('id', ParseIntPipe) id:number
    ){

        const sess = session.username;
        return await this.reportsService.process(id,Action,sess);
    }

    @Get('/getProcessedReport')
    @UseGuards(SessionGuard)
    getProcessedReport(): any {
        return this.reportsService.getProcessedReport();
    }





}