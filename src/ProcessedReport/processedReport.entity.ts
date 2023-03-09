import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("ProcessedReport")
export class ProcessedReportEntity{
    
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    ReportTittle:string;

    @Column()
    Discription:string;

    @Column()
    ReportedDate:Date;

    @Column()
    ReportedUsername:string;

    @Column()
    ReportedUserId: number;

    // @Column()
    // ReportedByUserId: number;

    // @Column()
    // ReportedByUsername:string;

    @Column()
    ProcessedByUsername:string;

    @Column()
    ProcessedByUserID: number;
}