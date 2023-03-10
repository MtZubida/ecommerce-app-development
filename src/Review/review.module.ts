import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { ReviewController } from "./review.controller";
import { ReviewEntity } from "./review.entity";
import { ReviewService } from "./review.service";


@Module(
    {
        imports: [TypeOrmModule.forFeature([SellerEntity, UserEntity, ReviewEntity])],
        controllers: [ReviewController],
        providers: [ReviewService],
    }
)
export class ReviewModule {}