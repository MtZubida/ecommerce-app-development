import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "./message.entity";

@Injectable()
export class MessageService{
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepo: Repository<MessageEntity>
    ){}

    send(myDto): any{
        if(myDto.SenderUsername != myDto.ReceverUsername){
            return this.messageRepo.save(myDto);
        }
        else
            return "You cant send message to yourself";
    }
}
