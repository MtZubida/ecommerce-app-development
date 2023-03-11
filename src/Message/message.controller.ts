import { Body, Controller, Get, Param, Post, Session, UseGuards } from "@nestjs/common";
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

    @Get('/:receiverUsername')
    @UseGuards(SessionGuard)
    async getMessages(
    @Session() session,
    @Param('receiverUsername') receiverUsername: string,
    ): Promise<any> {
    var senderUsername = session.username;
    const messages = await this.messageService.getMessages(
        senderUsername,
        receiverUsername
    );
    return { messages };
    }

}