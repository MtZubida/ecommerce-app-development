import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("report")
export class ReportEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    ReporterUsername:string;

    @Column()
    ReportedUsername:string;

    @Column()
    Discription:string;

    @Column({ nullable: true })
    ModeratorUsername:string;

    @Column({ nullable: true })
    Action:string;

    @Column()
    Timestamp:Date = new Date();

    @ManyToOne(() => UserEntity, (user) => user.reports)
    user: UserEntity;

    @ManyToOne(() => SellerEntity, (seller) => seller.reports)
    seller: SellerEntity;


}