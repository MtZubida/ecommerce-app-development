import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { ReviewDTO } from "./DTOs/review.dto";
import { ReviewEntity } from "./review.entity";

@Injectable()
export class ReviewService{
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ReviewEntity)
        private reviewRepo: Repository<ReviewEntity>,

    ){}

    async addReport(mydto:ReviewDTO):Promise<any> {
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.ReviewByUsername });
        if(existingUser){
            const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.ReviewToUsername });
            if(existSeller){
                const reviewEnt = new ReviewEntity();
                reviewEnt.user = existingUser;
                reviewEnt.seller = existSeller;
                reviewEnt.Review = mydto.Review;
                reviewEnt.ReviewByUsername = mydto.ReviewByUsername;
                reviewEnt.ReviewToUsername = mydto.ReviewToUsername;
                // console.log(reviewEnt);
                return this.reviewRepo.save(reviewEnt);
            }
            else{
                return "Seller username not found.";
            }
        }
        else{
            return "Only user can review seller. Login as user!";
        }
    }

    async getAll(): Promise<ReviewEntity[]> {
        const queryBuilder = this.reviewRepo
          .createQueryBuilder('review')
          .leftJoinAndSelect('review.seller', 'seller')
          .leftJoinAndSelect('review.user', 'user');
        const reports = await queryBuilder.getMany();
        return reports;
    }

    getPartial(): any{
        return this.reviewRepo.find();
    }

    async searchById(id):Promise<any>{
        var ext = this.reviewRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    async searchBySellerId(sellerId): Promise<ReviewEntity[]> {
        const seller = await this.sellerRepo.findOneBy({Id:sellerId})
        if (!seller) {
        throw new Error('Seller not found');
        }
        const reports = await this.reviewRepo.find({
        where: { seller: seller },
        relations: ['user'],
        });
        return reports;
    }

    async searchBySellerIdReturnAll(sellerId): Promise<ReviewEntity[]> {
        const seller = await this.sellerRepo.findOneBy({Id:sellerId})
        if (!seller) {
        throw new Error('Seller not found');
        }
        const reports = await this.reviewRepo.find({
        where: { seller: seller },
        relations: ['user', 'seller'],
        });
        return reports;
    }

    async searchBySellerUsername(username): Promise<ReviewEntity[]> {
        console.log(username);
        var ext = this.sellerRepo.findOne({where: { Username:username}});
        return this.searchBySellerId((await ext).Id);
    }

    async searchBySellerUsernameReturnAll(username): Promise<ReviewEntity[]> {
        console.log(username);
        var ext = this.sellerRepo.findOne({where: { Username:username}});
        return this.searchBySellerIdReturnAll((await ext).Id);
    }

    async searchByUserId(userId): Promise<ReviewEntity[]> {
        const user = await this.userRepo.findOneBy({Id:userId})
        if (!user) {
        throw new Error('Seller not found');
        }
        const reports = await this.reviewRepo.find({
        where: { user: user },
        relations: ['seller'],
        });
        return reports;
    }
    
    async searchByUserIdReturnAll(userId): Promise<ReviewEntity[]> {
        const user = await this.userRepo.findOneBy({Id:userId})
        if (!user) {
        throw new Error('Seller not found');
        }
        const reports = await this.reviewRepo.find({
        where: { user: user },
        relations: ['seller', 'user'],
        });
        return reports;
    }

    async searchByUserUsername(username): Promise<ReviewEntity[]> {
        var ext = this.userRepo.findOne({where: { Username:username}});
        return this.searchByUserId((await ext).Id);
    }
    
    async searchByUserUsernameReturnAll(username): Promise<ReviewEntity[]> {
        var ext = this.userRepo.findOne({where: { Username:username}});
        return this.searchByUserIdReturnAll((await ext).Id);
    }

}