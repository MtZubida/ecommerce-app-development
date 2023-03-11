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

    async getMessages(
        senderUsername: string,
        receiverUsername: string,
      ): Promise<MessageEntity[]> {
        return this.messageRepo.find({
          where: [
            { SenderUsername: senderUsername, ReceverUsername: receiverUsername },
            { SenderUsername: receiverUsername, ReceverUsername: senderUsername },
          ],
        });
      }
}
