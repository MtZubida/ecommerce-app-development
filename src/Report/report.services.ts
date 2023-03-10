import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { ReportDTO } from "./DTOs/report.dto";
import { ReportEntity } from "./report.entity";

@Injectable()
export class ReportService{
    constructor(

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ReportEntity)
        private reportRepo: Repository<ReportEntity>,
    ){}

    async addReport(mydto:ReportDTO):Promise<any> {
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.ReporterUsername });
        if(existingUser){
            const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.ReportedUsername });
            if(existSeller){
                const reportEnty = new ReportEntity();
                reportEnty.user = existingUser;
                reportEnty.seller = existSeller;
                reportEnty.Discription = mydto.Discription;
                reportEnty.ModeratorUsername = mydto.ModeratorUsername;
                reportEnty.ReportedUsername = mydto.ReportedUsername;
                reportEnty.ReporterUsername = mydto.ReporterUsername;
                return this.reportRepo.save(reportEnty);
            }
            else{
                return "Seller username not found.";
            }
        }
        else{
            return "Only user can report seller.";
        }
    }

    async getAll(): Promise<ReportEntity[]> {
        const queryBuilder = this.reportRepo
          .createQueryBuilder('report')
          .leftJoinAndSelect('report.seller', 'seller')
          .leftJoinAndSelect('report.user', 'user');
        const reports = await queryBuilder.getMany();
        return reports;
    }

    getPartial(): any{
        return this.reportRepo.find();
    }

    searchById(id):any{
        const ext = this.reportRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    async searchBySellerId(sellerId): Promise<ReportEntity[]> {
        const seller = await this.sellerRepo.findOneBy({Id:sellerId})
        if (!seller) {
        throw new Error('Seller not found');
        }
        const reports = await this.reportRepo.find({
        where: { seller: seller },
        relations: ['user'],
        });
        return reports;
    }

    async searchBySellerIdReturnAll(sellerId): Promise<ReportEntity[]> {
        const seller = await this.sellerRepo.findOneBy({Id:sellerId})
        if (!seller) {
        throw new Error('Seller not found');
        }
        const reports = await this.reportRepo.find({
        where: { seller: seller },
        relations: ['user', 'seller'],
        });
        return reports;
    }


    async searchBySellerUsername(username): Promise<ReportEntity[]> {
        console.log(username);
        var ext = this.sellerRepo.findOne({where: { Username:username}});
        return this.searchBySellerId((await ext).Id);
    }

    async searchBySellerUsernameReturnAll(username): Promise<ReportEntity[]> {
        console.log(username);
        var ext = this.sellerRepo.findOne({where: { Username:username}});
        return this.searchBySellerIdReturnAll((await ext).Id);
    }


    //seller/reporter

    async searchByUserId(userId): Promise<ReportEntity[]> {
        const user = await this.userRepo.findOneBy({Id:userId})
        if (!user) {
        throw new Error('Seller not found');
        }
        const reports = await this.reportRepo.find({
        where: { user: user },
        relations: ['seller'],
        });
        return reports;
    }
    
    async searchByUserIdReturnAll(userId): Promise<ReportEntity[]> {
        const user = await this.userRepo.findOneBy({Id:userId})
        if (!user) {
        throw new Error('Seller not found');
        }
        const reports = await this.reportRepo.find({
        where: { user: user },
        relations: ['seller', 'user'],
        });
        return reports;
    }



}