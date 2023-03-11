import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { ForgotPasswordController } from "./forgot.controller";
import { ForgotPasswordEntity } from "./forgot.entity";
import { ForgotPasswordService } from "./forgot.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([ForgotPasswordEntity, AdminEntity, UserEntity, ModeratorEntity, SellerEntity])],
        controllers: [ForgotPasswordController],
        providers: [ForgotPasswordService],
    }
)
export class ForgotPasswordModule {}