import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";

@Controller('/checkout')
export class CheckoutController{
    constructor(private checkoutService: CheckoutService){}


    @Get('/getAll')
    getModerators(): any {
        return this.checkoutService.getAll();
    }



    @Get("/search/:id")
    searchById(@Param('id', ParseIntPipe) id:number){
        return this.checkoutService.searchById(id);
    }

    @Get('/getAllInfo')
    getAllInfo(): any {
        return this.checkoutService.getAllInfo();
    }
    
}