import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("review")
export class ReviewEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Review:string;

    @Column()
    ReviewByUsername:string;

    @Column()
    ReviewToUsername:string;

    @Column()
    Timestamp:Date = new Date();

    @ManyToOne(() => UserEntity, (user) => user.review)
    user: UserEntity;

    @ManyToOne(() => SellerEntity, (seller) => seller.review)
    seller: SellerEntity;


}