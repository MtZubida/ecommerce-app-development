import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CheckoutEntity } from "./checkout.entity";

@Injectable()
export class CheckoutService {
    constructor(

        @InjectRepository(CheckoutEntity)
        private checkoutRepo: Repository<CheckoutEntity>,
    ){}

    getAll(): any{
        return this.checkoutRepo.find();
    }

    async searchById(id):Promise<any>{
        const ext = await this.checkoutRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    async getAllInfo(): Promise<CheckoutEntity[]> {
        const queryBuilder = this.checkoutRepo
          .createQueryBuilder('checkout')
          .leftJoinAndSelect('checkout.seller', 'seller')
          .leftJoinAndSelect('checkout.user', 'user');
        const reports = await queryBuilder.getMany();
        return reports;
    }

}