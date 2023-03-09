import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProcessedReportDTO } from "./processedReport.dto";
import { ProcessedReportEntity } from "./processedReport.entity";

@Injectable()
export class ProcessedReportService {
    
    constructor(
        @InjectRepository(ProcessedReportEntity)
        private reportRepo: Repository<ProcessedReportEntity>
    ){}

    addReport(reportDTO: ProcessedReportDTO):any{
        const reportObject = new ProcessedReportEntity()
        reportObject.ReportTittle = reportDTO.ReportTittle;
        reportObject.Discription = reportDTO.Discription;
        reportObject.ReportedDate = new Date();
        reportObject.ReportedUsername = reportDTO.ReportedUsername;
        reportObject.ReportedUserId = reportDTO.ReportedUserId;
        reportObject.ProcessedByUsername = reportDTO.ProcessedByUsername;
        reportObject.ProcessedByUserID = reportDTO.ProcessedByUserID;

        return this.reportRepo.save(reportObject);
        
    }


}