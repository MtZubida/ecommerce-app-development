import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { UserController } from "src/User/user.controller";
import { UserEntity } from "src/User/user.entity";
import { UserService } from "src/User/user.service";
import { SellerController } from "./seller.controller";
import { SellerEntity } from "./seller.entity";
import { SellerService } from "./seller.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([SellerEntity, AdminEntity, ModeratorEntity, UserEntity])],
        controllers: [SellerController],
        providers: [SellerService],
    }
)
export class SellerModule {}