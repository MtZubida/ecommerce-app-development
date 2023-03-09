import { Body, Controller, Get, Post, Session, UseGuards } from "@nestjs/common";
import { MessageDTO } from "./DTOs/message.dto";
import { MessageService } from "./message.service";
import { SessionGuard } from "./session.guard";

@Controller('/chat')
export class MessageController{
    constructor(private messageService: MessageService){}
    
    @Post('/send')
    @UseGuards(SessionGuard)
    send(@Session() session, @Body() myDto: MessageDTO){
        myDto.SenderUsername = session.username;
        myDto.Timestamp = new Date();
        // console.log(myDto.Timestamp);
        return this.messageService.send(myDto);

    }
}