import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckoutEntity } from "src/Checkout/checkout.entity";
import { CouponEntity } from "src/Coupon/coupon.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { TransactionEntity } from "src/Transaction/transaction.entity";
import { UserEntity } from "src/User/user.entity";
import { ProductController } from "./product.controller";
import { ProductEntity } from "./product.entity";
import { ProductService } from "./product.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([SellerEntity, ProductEntity, UserEntity, TransactionEntity, CheckoutEntity, CouponEntity])],
        controllers: [ProductController],
        providers: [ProductService],
    }
)
export class ProductModule {}