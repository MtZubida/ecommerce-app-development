// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity("message")
// export class MessageEntity{
//     @PrimaryGeneratedColumn()
//     Id:number;

//     @Column()
//     SenderUsername:string;

//     @Column()
//     ReceverUsername:string;

//     @Column()
//     Timestamp:Date;

//     @Column()
//     Message:string;

// }

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SellerEntity } from '../seller/seller.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => UserEntity, user => user.sentMessages)
    sender: UserEntity;

  @ManyToOne(() => SellerEntity, seller => seller.receivedMessages)
    receiver: SellerEntity;
}