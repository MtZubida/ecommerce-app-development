import { Body, Controller, Get, Param, Post, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReportDTO } from "src/Report/DTOs/report.dto";
import { SessionGuard } from "./coupon.guard";
import { CouponService } from "./coupon.service";
import { CouponDTO } from "./DTOs/coupon.dto";

@Controller('/coupon')
export class CouponController{
    constructor(private couponService: CouponService){}

    @Post('/add')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto: CouponDTO, @Session() session): any {
            mydto.AdminUsername = session.username;
        return this.couponService.addReport(mydto);
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getAll(): any {
        return this.couponService.getAll();
    }

    @Get('/getPartial')
    @UseGuards(SessionGuard)
    getPartial(): any {
        return this.couponService.getPartial();
    }

    
    
}