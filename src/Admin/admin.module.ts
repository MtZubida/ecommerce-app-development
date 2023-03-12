import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ForgotPasswordEntity } from "src/ForgotPassword/forgot.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { ModeratorModule } from "src/Moderator/moderator.module";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { AdminService } from "./admin.service";

@Module(
    {
        imports: [MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
                       port: 465,
                       ignoreTLS: true,
                       secure: true,
                       auth: {
                           user: 'neeerob.ahmed2@gmail.com',
                           pass: 'bndcibuaqkiionsm'
                       },
                      }
          }),TypeOrmModule.forFeature([UserEntity, AdminEntity, ModeratorEntity, SellerEntity, ForgotPasswordEntity])],
        controllers: [AdminController],
        providers: [AdminService],
    }
)
export class AdminModule {}