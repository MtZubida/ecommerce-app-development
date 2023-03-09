import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { ModeratorService } from "src/Moderator/moderator.service";
import { ProcessedReportController } from "./processedReport.controller";
import { ProcessedReportEntity } from "./processedReport.entity";
import { ProcessedReportService } from "./processedReport.services";


@Module(
    {
        imports: [TypeOrmModule.forFeature([ProcessedReportEntity])],
        controllers:[],
        providers:[],
    }
)
export class ProcessedReportModule {}