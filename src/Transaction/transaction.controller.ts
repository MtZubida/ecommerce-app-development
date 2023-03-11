import { Body, Controller, Get, Post, Session, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ReportDTO } from "src/Report/DTOs/report.dto";
import { DepositOrWithdrawlDTO } from "./DTOs/depositOrWithdraw.dto";
import { TransactionDTO } from "./DTOs/transaction.dto";
import { SessionGuard } from "./transaction.guard";
import { TransactionService } from "./transaction.service";

@Controller('/transaction')
export class TransactionController{
    constructor(private transactionService: TransactionService){}

    @Post('/add')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    addTransaction(@Body() mydto: TransactionDTO, @Session() session): any {
            mydto.SenderUsername = session.username;
        return this.transactionService.addTransaction(mydto);
    }

    @Post('/deposit')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    depositModey(@Body() mydto: DepositOrWithdrawlDTO, @Session() session): any {
            mydto.SenderUsername = session.username;
        return this.transactionService.deposit(mydto);
    }

    @Post('/withdraw')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    withdrawModey(@Body() mydto: DepositOrWithdrawlDTO, @Session() session): any {
            mydto.SenderUsername = session.username;
        return this.transactionService.withdraw(mydto);
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

    @Get('/getAll/deposit')
    @UseGuards(SessionGuard)
    getAlldeposit(): any {
        return this.transactionService.getAlldeposit();
    }

    @Get('/getAll/withdraw')
    @UseGuards(SessionGuard)
    getAllWithdraw(): any {
        return this.transactionService.getAllWithdraw();
    }



    
}