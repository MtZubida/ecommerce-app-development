import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { DepositOrWithdrawlDTO } from "./DTOs/depositOrWithdraw.dto";
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

    async addTransaction(mydto:TransactionDTO):Promise<any> {
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
                reportEnty.Ammount = mydto.Ammount;
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

    async deposit(mydto:DepositOrWithdrawlDTO):Promise<any> {
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.SenderUsername });
        const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.SenderUsername });
        if(existingUser){
            if(mydto.Ammount > 0){
                const reportEnty = new TransactionEntity();
                reportEnty.user = existingUser;
                reportEnty.seller = null;
                reportEnty.Discription = "Deposit";
                reportEnty.SenderUsername = mydto.SenderUsername;
                reportEnty.ReceiverUsername = null;
                reportEnty.Ammount = mydto.Ammount.valueOf();
                existingUser.Wallet = (+existingUser.Wallet + mydto.Ammount);
                await this.userRepo.update(existingUser.Id, existingUser);
                return this.transactionRepo.save(reportEnty);
            }
            else{
                return "You cant put negative number in deposit";
            }
        }
        else if(existSeller){
            if(mydto.Ammount > 0){
                const reportEnty = new TransactionEntity();
                reportEnty.user = null;
                reportEnty.seller = existSeller;
                reportEnty.Discription = "Deposit";
                reportEnty.SenderUsername = mydto.SenderUsername;
                reportEnty.ReceiverUsername = null;
                reportEnty.Ammount = mydto.Ammount.valueOf();
                existSeller.Wallet = (+existSeller.Wallet + mydto.Ammount);
                await this.sellerRepo.update(existSeller.Id, existSeller);
                return this.transactionRepo.save(reportEnty);
            }
            else{
                return "You cant put negative number in deposit";
            }
        }
        else{
            return "Login as seller or user.";
        }
    }

    async withdraw(mydto:DepositOrWithdrawlDTO):Promise<any> {
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.SenderUsername });
        const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.SenderUsername });
        if(existingUser){
            if(mydto.Ammount > 0){
                if(mydto.Ammount < existingUser.Wallet){
                    const reportEnty = new TransactionEntity();
                    reportEnty.user = existingUser;
                    reportEnty.seller = null;
                    reportEnty.Discription = "Withdraw";
                    reportEnty.SenderUsername = mydto.SenderUsername;
                    reportEnty.ReceiverUsername = null;
                    reportEnty.Ammount = mydto.Ammount.valueOf();
                    existingUser.Wallet = (+existingUser.Wallet - mydto.Ammount);
                    await this.userRepo.update(existingUser.Id, existingUser);
                    return this.transactionRepo.save(reportEnty);
                }
                else{
                    return "You dont have enough money to withdraw";
                }
            }
            else{
                return "You cant put negative number in deposit";
            }
        }
        else if(existSeller){
            if(mydto.Ammount > 0){
                if(mydto.Ammount < existSeller.Wallet){
                    const reportEnty = new TransactionEntity();
                    reportEnty.user = null;
                    reportEnty.seller = existSeller;
                    reportEnty.Discription = "Withdraw";
                    reportEnty.SenderUsername = mydto.SenderUsername;
                    reportEnty.ReceiverUsername = null;
                    reportEnty.Ammount = mydto.Ammount.valueOf();
                    existSeller.Wallet = (+existSeller.Wallet - mydto.Ammount);
                    await this.sellerRepo.update(existSeller.Id, existSeller);
                    return this.transactionRepo.save(reportEnty);
                }
                else{
                    return "You dont have enough money to withdraw";
                }
            }
            else{
                return "You cant put negative number in deposit";
            }
        }
        else{
            return "Login as seller or user.";
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

    async getAlldeposit(): Promise<any>{
        const transactions = await this.transactionRepo.find({ where: { Discription: "Deposit" } });
        return transactions;
    }

    async getAllWithdraw(): Promise<any>{
        const transactions = await this.transactionRepo.find({ where: { Discription: "Withdraw" } });
        return transactions;
    }
}