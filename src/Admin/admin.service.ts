import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import * as bcrypt from 'bcrypt';
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { SecureAdminDTO } from "./DTOs/secureAdmin.dto";
import { EditAdminDTO } from "./DTOs/editAdmin.dto";
import { UserEntity } from "src/User/user.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { MailerService } from "@nestjs-modules/mailer";
import { ForgotPasswordEntity } from "src/ForgotPassword/forgot.entity";

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

        @InjectRepository(ModeratorEntity)
        private moderatorRepo: Repository<ModeratorEntity>,

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,

        @InjectRepository(ForgotPasswordEntity)
        private forgotRepo: Repository<ForgotPasswordEntity>,

        private mailerService: MailerService,
    ){}

    

    getIndex(): any{
        return "This path will be the Admin panel";
    }

    async getAllSecureData(): Promise<SecureAdminDTO[]> {
        const moderators: ModeratorEntity[] = await this.adminRepo.find();
        const secureModerators: SecureAdminDTO[] = moderators.map(
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
        return this.adminRepo.find();
    }

    searchById(id):any{
        var ext = this.adminRepo.findOneBy({ Id:id });
        if(ext){
            return ext;
        }
        else
            return "No matches found for this ID in database!"; // Need to implement
    }

    searchByUsername(username): any{
        const ext = this.adminRepo.findOne({where: { Username:username}});
        if(ext){
            return ext;
        }
        else
            return "No matches found for this username in database!";

    }

    editModerator(editAdmin: EditAdminDTO, id): any{
        return this.adminRepo.update(id, editAdmin);
    }

    deleteModeratorById(id): any{
        return this.adminRepo.delete(id);
    }

    async blockModeratorById(id): Promise<any>{

        var ext = this.adminRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = true;
            return this.adminRepo.update(id, await ext);
        }
        else
            return "No matches found for this ID in database!"; 
    }

    async unblockModeratorById(id): Promise<any>{

        var ext = this.adminRepo.findOneBy({ Id:id });
        if(ext){
            (await ext).Blocked = false;
            return this.adminRepo.update(id, await ext);
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
            return this.adminRepo.save(mydto);
        }
    }

    async login(username, password){
        const mydata= await this.adminRepo.findOneBy({Username: username});
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