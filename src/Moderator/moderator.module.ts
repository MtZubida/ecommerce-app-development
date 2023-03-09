import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { ModeratorController } from "./moderator.controller";
import { ModeratorEntity } from "./moderator.entity";
import { ModeratorService } from "./moderator.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([ModeratorEntity, AdminEntity, UserEntity, SellerEntity])],
        controllers: [ModeratorController],
        providers: [ModeratorService],
    }
)
export class ModeratorModule {}