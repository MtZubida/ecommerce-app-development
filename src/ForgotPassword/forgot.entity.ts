import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("forgot")
export class ForgotPasswordEntity{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Username:string;

    @Column()
    Code:number;

    @Column()
    Timestamp:Date = new Date();

    @Column()
    ExpareTime:Date = new Date(Date.now() + 3 * 60 * 1000);

    @Column()
    Status:string;
}