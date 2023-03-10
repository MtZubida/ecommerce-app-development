import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { ReportController } from "./report.controller";
import { ReportEntity } from "./report.entity";
import { ReportService } from "./report.services";

@Module(
    {
        imports: [TypeOrmModule.forFeature([ReportEntity, SellerEntity, UserEntity])],
        controllers: [ReportController],
        providers: [ReportService],
    }
)
export class ReportModule {}