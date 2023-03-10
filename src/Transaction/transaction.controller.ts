import { Body, Controller, Get, Post, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReportDTO } from "src/Report/DTOs/report.dto";
import { TransactionDTO } from "./DTOs/transaction.dto";
import { SessionGuard } from "./transaction.guard";
import { TransactionService } from "./transaction.service";

@Controller('/transaction')
export class TransactionController{
    constructor(private transactionService: TransactionService){}

    @Post('/add')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto: TransactionDTO, @Session() session): any {
            mydto.SenderUsername = session.username;
        return this.transactionService.addReport(mydto);
    }

    @Get('/getAll')
    @UseGuards(SessionGuard)
    getAll(): any {
        return this.transactionService.getAll();
    }

    @Get('/getPartial')
    @UseGuards(SessionGuard)
    getPartial(): any {
        return this.transactionService.getPartial();
    }
    
}