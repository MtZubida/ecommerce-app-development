import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { ModeratorEntity } from "./moderator.entity";
import { SecureModeratorDTO } from "./DTOs/secureModerator.dto";
import { EditModeratorDTO } from "./DTOs/editModerator.dto";
import { AdminEntity } from "src/Admin/admin.entity";
import { UserEntity } from "src/User/user.entity";
import { SellerEntity } from "src/Seller/seller.entity";

@Injectable()
export class ModeratorService{

    constructor(
        @InjectRepository(ModeratorEntity)
        private moderatorRepo: Repository<ModeratorEntity>, 

        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,
    ){}

    getIndex(): any{
        return "This path will be the Moderator panel";
    }

    async getAllSecureData(): Promise<SecureModeratorDTO[]> {
        const moderators: ModeratorEntity[] = await this.moderatorRepo.find();
        const secureModerators: SecureModeratorDTO[] = moderators.map(
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
        return secureModerators;
    }

    getAll(): any{
        return this.moderatorRepo.find();
    }

    searchById(id):any{
        var ext = this.moderatorRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    searchByUsername(username): any{
        const ext = this.moderatorRepo.findOne({where: { Username:username}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

    editModerator(editModerator: EditModeratorDTO, id): any{
        return this.moderatorRepo.update(id, editModerator);
    }

    deleteModeratorById(id): any{
        return this.moderatorRepo.delete(id);
    }

    async blockModeratorById(id): Promise<any>{

        var ext = this.moderatorRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = true;
            return this.moderatorRepo.update(id, await ext);
        }
        else
            return "No matches found for this ID in database!"; 
    }

    async unblockModeratorById(id): Promise<any>{

        var ext = this.moderatorRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = false;
            return this.moderatorRepo.update(id, await ext);
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
            return this.moderatorRepo.save(mydto);
        }
    }

    async login(username, password){
        const mydata= await this.moderatorRepo.findOneBy({Username: username});
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