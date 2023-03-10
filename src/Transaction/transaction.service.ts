import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { TransactionDTO } from "./DTOs/transaction.dto";
import { TransactionEntity } from "./transaction.entity";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,
    ){}

    async addReport(mydto:TransactionDTO):Promise<any> {
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.SenderUsername });
        if(existingUser){
            const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.ReceiverUsername });
            if(existSeller){
                const reportEnty = new TransactionEntity();
                reportEnty.user = existingUser;
                reportEnty.seller = existSeller;
                reportEnty.Discription = mydto.Discription;
                reportEnty.SenderUsername = mydto.SenderUsername;
                reportEnty.ReceiverUsername = mydto.ReceiverUsername;
                reportEnty.Ammount = mydto.Ammount.valueOf();
                return this.transactionRepo.save(reportEnty);
            }
            else{
                return "Seller username not found.";
            }
        }
        else{
            return "Only user can send money to seller.";
        }
    }

    async getAll(): Promise<TransactionEntity[]> {
        const queryBuilder = this.transactionRepo
          .createQueryBuilder('report')
          .leftJoinAndSelect('report.seller', 'seller')
          .leftJoinAndSelect('report.user', 'user');
        const reports = await queryBuilder.getMany();
        return reports;
    }

    getPartial(): any{
        return this.transactionRepo.find();
    }
}