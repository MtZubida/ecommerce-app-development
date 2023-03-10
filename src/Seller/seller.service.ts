import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { UserEntity } from "src/User/user.entity";
import { Repository } from "typeorm";
import { SellerEntity } from "./seller.entity";
import * as bcrypt from 'bcrypt';
import { SecureSellerDTO } from "./DTOs/secureSeller.dto";
import { EditSellerDTO } from "./DTOs/editSeller.dto";

@Injectable()
export class SellerService{
    constructor(

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(ModeratorEntity)
        private moderatorRepo: Repository<ModeratorEntity>, 

        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,
    ){}

    getIndex(): any{
        return "This path will be the seller panel";
    }

    getAll(): any{
        return this.sellerRepo.find();
    }

    searchById(id):any{
        const ext = this.sellerRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    searchByUsername(username): any{
        var ext = this.sellerRepo.findOne({where: { Username:username}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

    editUser(editModerator: EditSellerDTO, id): any{
        return this.sellerRepo.update(id, editModerator);
    }

    deleteModeratorById(id): any{
        return this.sellerRepo.delete(id);
    }

    async blockModeratorById(id): Promise<any>{

        var ext = this.sellerRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = true;
            return this.sellerRepo.update(id, await ext);
        }
        else
            return "No matches found for this ID in database!"; 
    }

    async unblockModeratorById(id): Promise<any>{

        var ext = this.sellerRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = false;
            return this.sellerRepo.update(id, await ext);
        }
        else
            return "No matches found for this ID in database!"; 
    }




    async signup(mydto) {

        const existingAdmin = await this.adminRepo.findOneBy({ Username: mydto.Username });
        const existingModerator = await this.moderatorRepo.findOneBy({ Username: mydto.Username });
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.Username });
        const existSeller = await this.sellerRepo.findOneBy({ Username: mydto.Username });

        if (existingModerator || existingAdmin || existingUser||existSeller) {
            return "Username already exists, please choose a different username";
        } else {
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(mydto.Password, salt);
            mydto.Password= hassedpassed;
            return this.sellerRepo.save(mydto);
        }
    }

    async login(username, password){
        const mydata= await this.sellerRepo.findOneBy({Username: username});
        if(mydata){
            const isMatch= await bcrypt.compare(password, mydata.Password);
            if(isMatch && mydata.Blocked != true) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    }
    
}