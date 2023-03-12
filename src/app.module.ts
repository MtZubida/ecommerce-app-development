import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeratorModule } from './Moderator/moderator.module';
import { AdminModule } from './Admin/admin.module';
import { UserModule } from './User/user.module';
import { MessageModule } from './Message/message.module';
import { SellerModule } from './Seller/seller.module';
import { ReportModule } from './Report/report.module';
import { ReviewModule } from './Review/review.module';
import { TransactionModule } from './Transaction/transaction.module';
import { CouponModule } from './Coupon/coupon.module';
import { ProductModule } from './Product/product.module';
import { CheckoutModule } from './Checkout/checkout.module';
import { ForgotPasswordModule } from './ForgotPassword/forgot.module';


@Module({
  //import individual module here. Do not override this 
  //Don't delete this
  imports: [ModeratorModule, AdminModule, UserModule, MessageModule,SellerModule, ReportModule,ReviewModule, TransactionModule, CouponModule, ProductModule,CheckoutModule,ForgotPasswordModule, TypeOrmModule.forRoot({
    type:'postgres',
    host: 'localhost',
    port:5432,
    username:'postgres',
    password:'112233',
    database:'dbv1.9',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
