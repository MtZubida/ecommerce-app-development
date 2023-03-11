import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("message")
export class MessageEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    SenderUsername:string;

    @Column()
    ReceverUsername:string;

    @Column()
    Timestamp:Date = new Date();

    @Column()
    Message:string;

}
