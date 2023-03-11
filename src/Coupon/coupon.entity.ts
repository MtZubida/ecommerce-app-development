import { AdminEntity } from "src/Admin/admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("coupon")
export class CouponEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    AdminUsername:string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    Ammount:number;

    @Column()
    Discription:string;

    @Column()
    Timestamp:Date = new Date();

    @Column()
    Useability:number;

    @Column()
    Couponcode: number;

    @Column()
    Used: number = 0;

    @ManyToOne(() => AdminEntity, (admin) => admin.coupon)
    admin: AdminEntity

}