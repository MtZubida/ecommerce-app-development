import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionEntity } from "./transaction.entity";
import { TransactionService } from "./transaction.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([SellerEntity, UserEntity, TransactionEntity])],
        controllers: [TransactionController],
        providers: [TransactionService],
    }
)
export class TransactionModule {}