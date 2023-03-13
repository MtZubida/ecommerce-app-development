//import { AdminEntity } from 'src/admin/adminentity.entity';
import { AdminEntity } from '../admin/adminentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("seller")
export class SellerEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    sname: string;
  
    @Column()
    email: string;
  
    @Column()
    phn: number;
    @Column()
    gender: string; 
    @Column()
    religion: string;
    @Column()
    address: string;
    @Column()
    adminname:string;

 @ManyToOne(() =>AdminEntity, (admin) => admin.sellers)
    admin: AdminEntity

}