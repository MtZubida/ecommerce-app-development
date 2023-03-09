import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin")
export class AdminEntity{

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
    
}