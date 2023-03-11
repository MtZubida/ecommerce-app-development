import { Body, Controller, Param, Post } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot.service";

@Controller('/forgotPassword')
export class ForgotPasswordController{
    constructor(private forgotService: ForgotPasswordService){}

    @Post("/:username")
    sendEmail(@Param('username') username:string){
        return this.forgotService.createCode(username);
    }

    @Post("/setPassword/:username")
    changePassword(@Param('username') username:string,
    @Body('password') password:string,
    @Body('code') code:number
    ){
        return this.forgotService.changePassword(username, password, code);
    }
}