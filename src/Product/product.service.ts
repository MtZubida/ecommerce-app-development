import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SellerEntity } from "src/Seller/seller.entity";
import { Repository } from "typeorm";
import { ProductDTO } from "./product.dto";
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

            const existSeller = await this.sellerRepo.findOneBy({ name: mydto.Sellername });
    
            if (existSeller) {
                const product = new ProductEntity();
                product.seller = existSeller;
                product.ProductName = mydto.ProductName;
                product.Price = mydto.Price;
                product.Description = mydto.Description;
                product.Sellername = mydto.Sellername;
                product.Quantity = mydto.Quantity;
                product.SoldQuantity= mydto.SoldQuantity;
                product.filename = mydto.filename;
                return this.productRepo.save(product);
            } else {
                return "Login as a seller";
            }
        }

     getAll(): any {
       return this.productRepo.find();
    }


    async searchByName(ProductName):Promise<any>{
        var ext = await this.productRepo.findOneBy({ ProductName:ProductName });
        if(ext){
            return "Found Result: "+ext;
        }
        else
            return "No matches found for this ID in database!"; 
    }

    productAdd(Pname, price, quantity): any {
        return  "Product name: "+ Pname + " price: " + price+ " quantity: "+quantity ;
    }

    deleteProduct(id): any{
        return this.productRepo.delete(id);
    }

    updateProduct(id, Productname, Price, Quantity, SoldQuantity): any {
        return this.productRepo.update(id, {ProductName:Productname, Price:Price, Quantity:Quantity, SoldQuantity:SoldQuantity});
    }

    updateOne(id,mydto:ProductDTO): any {
        return this.productRepo.update(id,mydto);
    }

    findProductByname(qry): any {
        return this.productRepo.findOne({where: {ProductName: qry.ProductName}});
    }

}