import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminSessionGuard } from "src/Admin/admin.guard";
import { ReportDTO } from "src/Report/DTOs/report.dto";
import { SessionGuard } from "./coupon.guard";
import { CouponService } from "./coupon.service";
import { CouponDTO } from "./DTOs/coupon.dto";

@Controller('/coupon')
export class CouponController{
    constructor(private couponService: CouponService){}

    @Post('/add')
    @UseGuards(AdminSessionGuard)
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

    @Delete('delete/:id')
    @UseGuards(SessionGuard)
    deleteModeratorById(@Param('id', ParseIntPipe) id: number): any {
        return this.couponService.deleteCoupon(id);
    }

    
    
}