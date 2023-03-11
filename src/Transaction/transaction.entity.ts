import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction")
export class TransactionEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    SenderUsername:string;

    @Column({ nullable: true })
    ReceiverUsername:string;

    @Column()
    Discription:string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    Ammount:number;

    @Column()
    Timestamp:Date = new Date();

    @ManyToOne(() => UserEntity, (user) => user.transaction,{ nullable: true })
    user: UserEntity;

    @ManyToOne(() => SellerEntity, (seller) => seller.transaction, { nullable: true })
    seller: SellerEntity;

}