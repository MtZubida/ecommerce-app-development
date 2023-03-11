import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckoutController } from "./checkout.controller";
import { CheckoutEntity } from "./checkout.entity";
import { CheckoutService } from "./checkout.service";

@Module(
    {
        imports: [TypeOrmModule.forFeature([CheckoutEntity])],
        controllers: [CheckoutController],
        providers: [CheckoutService],
    }
)
export class CheckoutModule {}