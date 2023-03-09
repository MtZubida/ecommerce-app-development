import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProcessedReportDTO } from "./processedReport.dto";
import { ProcessedReportService } from "./processedReport.services";

@Controller("/processedReport")
export class ProcessedReportController{
    
    constructor(private reportService: ProcessedReportService){}

    @Post("/add")
    @UsePipes(new ValidationPipe())
    register(@Body() reportDTO: ProcessedReportDTO): any{
        return this.reportService.addReport(reportDTO);
    }


}