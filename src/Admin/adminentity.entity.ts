
import { SellerEntity } from '../sellerfile/seller.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("admin")
export class AdminEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
 filename: string;
  
  @OneToMany(() => SellerEntity, (seller) => seller.admin)
 sellers: SellerEntity[]


}

