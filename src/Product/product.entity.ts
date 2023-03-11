import { SellerEntity } from "src/Seller/seller.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class ProductEntity{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    ProductName:string;

    @Column()
    PublishedDate:Date = new Date();;

    @Column()
    Price:number;

    @Column()
    Discription:string;

    @Column()
    SellerUsername:string;

    @Column()
    Quantity:number;

    @Column()
    SelledQuantity:number = 0;

    @Column()
    filename: string

    @ManyToOne(() => SellerEntity, (seller) => seller.product)
    seller: SellerEntity
    
}