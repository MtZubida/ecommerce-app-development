import { CheckoutEntity } from "src/Checkout/checkout.entity";
import { MessageEntity } from "src/Message/message.entity";
import { ReportEntity } from "src/Report/report.entity";
import { ReviewEntity } from "src/Review/review.entity";
import { TransactionEntity } from "src/Transaction/transaction.entity";
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

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.user)
    review: ReviewEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
    transaction: TransactionEntity[];

    @OneToMany(() => CheckoutEntity, (checkout) => checkout.user)
    checkout: CheckoutEntity[];
    
}