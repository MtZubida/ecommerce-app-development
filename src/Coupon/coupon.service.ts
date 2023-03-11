import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { Repository } from "typeorm";
import { CouponEntity } from "./coupon.entity";
import { CouponDTO } from "./DTOs/coupon.dto";
import * as crypto from 'crypto';

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

        @InjectRepository(CouponEntity)
        private couponRepo: Repository<CouponEntity>,
    ){}

    async addReport(mydto:CouponDTO):Promise<any> {
        const exAdmin = await this.adminRepo.findOneBy({ Username: mydto.AdminUsername });
        if(exAdmin){
                const reportEnty = new CouponEntity();
                reportEnty.admin = exAdmin;
                reportEnty.Discription = mydto.Discription;
                reportEnty.Ammount = mydto.Ammount.valueOf();
                reportEnty.AdminUsername = mydto.AdminUsername;
                reportEnty.Useability = mydto.Useability;
                reportEnty.Couponcode = crypto.randomInt(100000000, 999999999);
                return this.couponRepo.save(reportEnty);
        }
        else{
            return "Only admin can create coupon. Login as admin";
        }
    }

    async getAll(): Promise<CouponEntity[]> {
        const queryBuilder = this.couponRepo
          .createQueryBuilder('coupon')
          .leftJoinAndSelect('coupon.admin', 'admin');
        const reports = await queryBuilder.getMany();
        return reports;
    }

    getPartial(): any{
        return this.couponRepo.find();
    }

    deleteCoupon(id): any{
        return this.couponRepo.delete(id);
    }

}