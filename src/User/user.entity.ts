import { MessageEntity } from "src/Message/message.entity";
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Firstname:string;

    @Column()
    Lastname:string;

    @Column()
    DOB:Date;

    @Column()
    Email:string;

    @Column()
    Phone:string;

    @Column()
    Username:string;

    @Column()
    Password:string;

    @Column()
    Blocked:boolean;

    @Column()
    filename:string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    Wallet: number;

    @OneToMany(() => MessageEntity, message => message.sender)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageEntity, message => message.receiver)
  receivedMessages: MessageEntity[];
    
}