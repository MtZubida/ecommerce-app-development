import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { CouponController } from "./coupon.controller";
import { CouponEntity } from "./coupon.entity";
import { CouponService } from "./coupon.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([CouponEntity, AdminEntity])],
        controllers: [CouponController],
        providers: [CouponService],
    }
)
export class CouponModule {}