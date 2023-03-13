import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './adminservice.service';
import { TypeOrmModule } from "@nestjs/typeorm";
//import { AdminModule } from './admin/adminmodule.module';
import { AdminEntity } from "./adminentity.entity";
import { SellerEntity } from '../sellerfile/seller.entity';
import { SellerService } from '../sellerfile/seller.service';
import { ModeratorService } from '../moderatorfile/moderator.service';
import { ModeratorEntity } from '../moderatorfile/moderator.entity';
import { MailerModule } from "@nestjs-modules/mailer";
@Module({
  //imports: [AdminModule],
  imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'zubaida.gttc@gmail.com',
                   pass: 'rljvkkbnbbizurof'
               },
              }
  }),
  TypeOrmModule.forFeature([AdminEntity,SellerEntity,ModeratorEntity])],
  controllers: [AdminController],
  providers: [AdminService,SellerService,ModeratorService],
})
export class AdminModule {}
