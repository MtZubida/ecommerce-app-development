import { ProcessedReportEntity } from "src/ProcessedReport/processedReport.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("moderator")
export class ModeratorEntity{

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