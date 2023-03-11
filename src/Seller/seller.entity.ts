import { CheckoutEntity } from "src/Checkout/checkout.entity";
import { MessageEntity } from "src/Message/message.entity";
import { ProductEntity } from "src/Product/product.entity";
import { ReportEntity } from "src/Report/report.entity";
import { TransactionEntity } from "src/Transaction/transaction.entity";
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("seller")
export class SellerEntity{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Name:string;

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

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    Star: number;

    @Column()
    TotalReviewer: number;
    
    @OneToMany(() => ReportEntity, (report) => report.seller)
    reports: ReportEntity[];

    @OneToMany(() => ReportEntity, (review) => review.seller)
    review: ReportEntity[];

    @OneToMany(() => TransactionEntity, (transaction) => transaction.seller)
    transaction: TransactionEntity[];

    @OneToMany(() => ProductEntity, (product) => product.seller)
    product: ProductEntity[]

    @OneToMany(() => CheckoutEntity, (checkout) => checkout.seller)
    checkout: CheckoutEntity[]
}