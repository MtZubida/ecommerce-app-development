import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/User/user.controller";
import { UserService } from "src/User/user.service";
import { SellerController } from "./seller.controller";
import { SellerEntity } from "./seller.entity";
import { SellerService } from "./seller.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([SellerEntity])],
        controllers: [SellerController],
        providers: [SellerService],
    }
)
export class SellerModule {}