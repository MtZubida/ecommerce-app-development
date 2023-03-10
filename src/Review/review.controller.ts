import { Body, Controller, Get, Param, ParseIntPipe, Post, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReportDTO } from "src/Report/DTOs/report.dto";
import { ReviewDTO } from "./DTOs/review.dto";
import { SessionGuard } from "./review.guard";
import { ReviewService } from "./review.service";

@Controller('/review')
export class ReviewController{
    constructor(private reviewService: ReviewService){}

    @Post('/add')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto: ReviewDTO, @Session() session): any {
            mydto.ReviewByUsername = session.username;
            // console.log(session.username);
        return this.reviewService.addReport(mydto);
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getAll(): any {
        return this.reviewService.getAll();
    }

    @Get('/getPartial')
    @UseGuards(SessionGuard)
    getPartial(): any {
        return this.reviewService.getPartial();
    }

    @Get("/search/:id")
    @UseGuards(SessionGuard)
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.reviewService.searchById(id);
    }

    //this will return users who have reviewed this seller by Id
    @Get("/search/bySellerId/:id")
    @UseGuards(SessionGuard)
    searchBySellerId(@Param('id', ParseIntPipe) id:number){
        return this.reviewService.searchBySellerId(id);
    }

    //This will return all associated with reviewed seller by Id
    @Get("/search/bySellerId/returnAll/:id")
    @UseGuards(SessionGuard)
    searchBySellerIdReturnAll(@Param('id', ParseIntPipe) id:number){
        return this.reviewService.searchBySellerIdReturnAll(id);
    }

    //previous same thing but instad of username 
    @Get("/search/bySellerUsername/:username")
    @UseGuards(SessionGuard)
    searchBySellerUsername(@Param('username',) username:string){
        return this.reviewService.searchBySellerUsername(username);
    }

    @Get("/search/bySellerUsername/returnAll/:username")
    @UseGuards(SessionGuard)
    searchBySellerUsernameReturnAll(@Param('username',) username:string){
        return this.reviewService.searchBySellerUsernameReturnAll(username);
    }

    //Now
    //Everything get by reviewed by/user

    @Get("/search/byUserId/:id")
    @UseGuards(SessionGuard)
    searchByUserId(@Param('id', ParseIntPipe) id:number){
        return this.reviewService.searchByUserId(id);
    }

    @Get("/search/byUserId/returnAll/:id")
    @UseGuards(SessionGuard)
    searchByUserIdReturnAll(@Param('id', ParseIntPipe) id:number){
        return this.reviewService.searchByUserIdReturnAll(id);
    }

    //Now
    //Everything get by reviewed by/user by :username

    @Get("/search/byUserUsername/:username")
    @UseGuards(SessionGuard)
    searchByUserUsername(@Param('username',) username:string){
        return this.reviewService.searchByUserUsername(username);
    }

    @Get("/search/byUserUsername/returnAll/:username")
    @UseGuards(SessionGuard)
    searchByUserUsernameReturnAll(@Param('username',) username:string){
        return this.reviewService.searchByUserUsernameReturnAll(username);
    }

    
}