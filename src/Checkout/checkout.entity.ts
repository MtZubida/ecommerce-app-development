import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("checkout")
export class CheckoutEntity{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    ProductName:string;

    @Column()
    Timestamp:Date = new Date();

    @Column()
    Price:number;

    @Column()
    Discription:string;

    @Column()
    SellerUsername:string;

    @Column()
    BuyerUsername:string;

    @Column()
    Quantity:number;

    @ManyToOne(() => SellerEntity, (seller) => seller.checkout)
    seller: SellerEntity

    @ManyToOne(() => UserEntity, (user) => user.checkout)
    user: UserEntity
    
}