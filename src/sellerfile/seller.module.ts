import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "../admin/adminentity.entity";
import { SellerEntity } from "./seller.entity";



@Module({
imports: [TypeOrmModule.forFeature([SellerEntity,AdminEntity])],
controllers: [],
providers: [],

})

export class SellerModule {}