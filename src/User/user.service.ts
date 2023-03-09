import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { Repository } from "typeorm";
import {UserEntity } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { SecureAdminDTO } from "src/Admin/DTOs/secureAdmin.dto";
import { EditUserDTO } from "./DTOs/editUser.dto";
import { SellerEntity } from "src/Seller/seller.entity";

@Injectable()
export class UserService{
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
        return "This path will be the User panel";
    }

    async getAllSecureData(): Promise<SecureAdminDTO[]> {
        const user: ModeratorEntity[] = await this.moderatorRepo.find();
        const secureuser: SecureAdminDTO[] = user.map(
            ({ Username, Firstname, Lastname, DOB, Phone, Email, filename }) => ({
              Username,
              Firstname,
              Lastname,
              DOB,
              Phone,
              Email,
              filename,
            }),
          );
        return secureuser;
    }

    getAll(): any{
        return this.userRepo.find();
    }

    searchById(id):any{
        var ext = this.userRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    searchByUsername(username): any{
        const ext = this.userRepo.findOne({where: { Username:username}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

    editUser(editModerator: EditUserDTO, id): any{
        return this.userRepo.update(id, editModerator);
    }

    deleteModeratorById(id): any{
        return this.userRepo.delete(id);
    }

    async blockModeratorById(id): Promise<any>{

        var ext = this.userRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = true;
            return this.userRepo.update(id, await ext);
        }
        else
            return "No matches found for this ID in database!"; 
    }

    async unblockModeratorById(id): Promise<any>{

        var ext = this.userRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = false;
            return this.userRepo.update(id, await ext);
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
            return this.userRepo.save(mydto);
        }
    }

    async login(username, password){
        const mydata= await this.userRepo.findOneBy({Username: username});
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