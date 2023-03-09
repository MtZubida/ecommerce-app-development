import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([UserEntity, ModeratorEntity, AdminEntity, SellerEntity])],
        controllers: [UserController],
        providers: [UserService],
    }
)
export class UserModule {}
