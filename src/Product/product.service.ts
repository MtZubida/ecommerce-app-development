import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CheckoutEntity } from "src/Checkout/checkout.entity";
import { CouponEntity } from "src/Coupon/coupon.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { TransactionEntity } from "src/Transaction/transaction.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(TransactionEntity)
        private transactionRepo: Repository<TransactionEntity>,

        @InjectRepository(CheckoutEntity)
        private checkoutRepo: Repository<CheckoutEntity>,

        @InjectRepository(CouponEntity)
        private couponRepo: Repository<CouponEntity>,
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
        var ext = await this.productRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    deleteProduct(id): any{
        return this.productRepo.delete(id);
    }

    searchByUsername(productname): any{
        const ext = this.productRepo.findOne({where: { ProductName:productname}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

    async buyProduct(id, buyerUsername):Promise<any>{
        var product = await this.productRepo.findOne({where: { Id:id}});
        if(product){
            var buyer = await this.userRepo.findOne({where: { Username:buyerUsername}});
            var seller = await this.sellerRepo.findOne({where: { Username:product.SellerUsername}});
            if(buyer){
                if(product.Quantity > 0){
                    if(buyer.Wallet > product.Price){
                        buyer.Wallet = (+buyer.Wallet - product.Price);
                        seller.Wallet = (+seller.Wallet + product.Price);
                        product.Quantity--;
                        product.SelledQuantity++;

                        const transEnty = new TransactionEntity();
                        transEnty.user = buyer;
                        transEnty.seller = seller;
                        transEnty.Discription = "Bought a product";
                        transEnty.SenderUsername = buyer.Username;
                        transEnty.ReceiverUsername = seller.Username;
                        transEnty.Ammount = product.Price;

                        const cOut = new CheckoutEntity();
                        cOut.ProductName = product.ProductName;
                        cOut.Price = product.Price;
                        cOut.Discription = "Bought a product";
                        cOut.SellerUsername = seller.Username;
                        cOut.BuyerUsername = buyer.Username;
                        cOut.Quantity = 1;
                        cOut.user = buyer;
                        cOut.seller = seller;

                        await this.checkoutRepo.save(cOut);
                        await this.transactionRepo.save(transEnty);
                        await this.userRepo.update(buyer.Id, buyer);
                        await this.sellerRepo.update(seller.Id, seller);
                        await this.productRepo.update(product.Id, product);
                        return cOut;
                    }
                    else{
                        return "You don't have enough money to buy this product";
                    }
                }
                else{
                    return "Quantity is 0. Not available. Try again later.";
                }
            }
            else{
                return "Login as User to buy products";
            }
        }
        else{
            return "No matches found for this ID in database!"; 
        }
    }

    async buyProductUsingCoupon(id, buyerUsername, coupon):Promise<any>{
        var couponObject = await this.couponRepo.findOne({where: { Couponcode:coupon}});
        if(couponObject){
            if(couponObject.Useability > 0){
                var product = await this.productRepo.findOne({where: { Id:id}});
                if(product){
                    var buyer = await this.userRepo.findOne({where: { Username:buyerUsername}});
                    var seller = await this.sellerRepo.findOne({where: { Username:product.SellerUsername}});
                    if(buyer){
                        if(product.Quantity > 0){
                            if(buyer.Wallet > product.Price){
                                buyer.Wallet = (+buyer.Wallet - product.Price) + +couponObject.Ammount ;
                                seller.Wallet = (+seller.Wallet + product.Price) - +couponObject.Ammount;
                                product.Quantity--;
                                product.SelledQuantity++;

                                couponObject.Useability--;
        
                                const transEnty = new TransactionEntity();
                                transEnty.user = buyer;
                                transEnty.seller = seller;
                                transEnty.Discription = "Bought a product";
                                transEnty.SenderUsername = buyer.Username;
                                transEnty.ReceiverUsername = seller.Username;
                                transEnty.Ammount = product.Price - +couponObject.Ammount;
        
                                const cOut = new CheckoutEntity();
                                cOut.ProductName = product.ProductName;
                                cOut.Price = product.Price - +couponObject.Ammount;
                                cOut.Discription = "Bought a product";
                                cOut.SellerUsername = seller.Username;
                                cOut.BuyerUsername = buyer.Username;
                                cOut.Quantity = 1;
                                cOut.user = buyer;
                                cOut.seller = seller;
        
                                await this.couponRepo.update(couponObject.Id, couponObject)
                                await this.checkoutRepo.save(cOut);
                                await this.transactionRepo.save(transEnty);
                                await this.userRepo.update(buyer.Id, buyer);
                                await this.sellerRepo.update(seller.Id, seller);
                                await this.productRepo.update(product.Id, product);
                                return cOut;
                            }
                            else{
                                return "You don't have enough money to buy this product";
                            }
                        }
                        else{
                            return "Quantity is 0. Not available. Try again later.";
                        }
                    }
                    else{
                        return "Login as User to buy products";
                    }
                }
                else{
                    return "No matches found for this ID in database!"; 
                }
            }
            else{
                return "This coupon is alrady used!";
            }
        }
        else
            return "No matches found for this coupon in database!";
    }


}