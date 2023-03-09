import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { ModeratorModule } from "src/Moderator/moderator.module";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { AdminService } from "./admin.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([UserEntity, AdminEntity, ModeratorEntity, SellerEntity])],
        controllers: [AdminController],
        providers: [AdminService],
    }
)
export class AdminModule {}