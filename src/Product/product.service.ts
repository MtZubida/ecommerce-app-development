import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
    ){}

    async add(mydto) {

        const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.SellerUsername });

        if (existSeller) {
            const transEn = new ProductEntity();
            transEn.seller = existSeller;
            transEn.ProductName = mydto.ProductName;
            transEn.Price = mydto.Price;
            transEn.Discription = mydto.Discription;
            transEn.SellerUsername = mydto.SellerUsername;
            transEn.Quantity = mydto.Quantity;
            transEn.filename = mydto.filename;
            return this.productRepo.save(transEn);
        } else {
            return "Login into a seller account!";
        }
    }

    async getAll(): Promise<ProductEntity[]> {
        const queryBuilder = this.productRepo
          .createQueryBuilder('product')
          .leftJoinAndSelect('product.seller', 'seller')
        const reports = await queryBuilder.getMany();
        return reports;
    }

    getPartial(): any{
        return this.productRepo.find();
    }

    async searchById(id):Promise<any>{
        var ext = this.productRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    searchByUsername(productname): any{
        const ext = this.productRepo.findOne({where: { ProductName:productname}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

}