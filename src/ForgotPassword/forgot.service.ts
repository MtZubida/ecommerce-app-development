import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { UserEntity } from "src/User/user.entity";
import { LessThanOrEqual, Repository } from "typeorm";
import { ForgotPasswordEntity } from "./forgot.entity";
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService{
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

    async createCode(username){
        const existingAdmin = await this.adminRepo.findOneBy({ Username: username });
        const existingModerator = await this.moderatorRepo.findOneBy({ Username: username });
        const existingUser = await this.userRepo.findOneBy({ Username: username });
        const existSeller = await this.sellerRepo.findOneBy({ Username: username });

        if(existingAdmin){
            const forgoteEnty = new ForgotPasswordEntity();
            forgoteEnty.Username = username;
            forgoteEnty.Status = "Not Used";
            forgoteEnty.Code = crypto.randomInt(10000, 99999);
            await this.forgotRepo.save(forgoteEnty);
            return await this.mailerService.sendMail({
                   to: existingAdmin.Email,
                   subject: "Reset Password",
                   text:  "Hello "+ username +" ! "+ forgoteEnty.Code  + " Is you code. Dont share it with anyone!", 
                 });
        }
        else if(existingModerator){
            const forgoteEnty = new ForgotPasswordEntity();
            forgoteEnty.Username = username;
            forgoteEnty.Status = "Not Used";
            forgoteEnty.Code = crypto.randomInt(10000, 99999);
            await this.forgotRepo.save(forgoteEnty);
            return await this.mailerService.sendMail({
                to: existingModerator.Email,
                subject: "Reset Password",
                text:  "Hello "+ username +" ! "+ forgoteEnty.Code  + " Is you code. Dont share it with anyone!", 
              });
        }
        else if(existingUser){
            const forgoteEnty = new ForgotPasswordEntity();
            forgoteEnty.Username = username;
            forgoteEnty.Status = "Not Used";
            forgoteEnty.Code = crypto.randomInt(10000, 99999);
            await this.forgotRepo.save(forgoteEnty);
            return await this.mailerService.sendMail({
                to: existingUser.Email,
                subject: "Reset Password",
                text:  "Hello "+ username +" ! "+ forgoteEnty.Code  + " Is you code. Dont share it with anyone!", 
              });
        }
        else if(existSeller){
            const forgoteEnty = new ForgotPasswordEntity();
            forgoteEnty.Username = username;
            forgoteEnty.Status = "Not Used";
            forgoteEnty.Code = crypto.randomInt(10000, 99999);
            await this.forgotRepo.save(forgoteEnty);
            return await this.mailerService.sendMail({
                to: existSeller.Email,
                subject: "Reset Password",
                text: "Hello "+ username +" ! "+ forgoteEnty.Code + " Is you code. Dont share it with anyone!", 
              });
        }
        else{
            return "Incurrect username! Please provide valid username";
        }
    }

    async changePassword(username,password,code){
        if(password.length >= 8){
            if(code != null){
                const existingAdmin = await this.adminRepo.findOneBy({ Username: username });
                const existingModerator = await this.moderatorRepo.findOneBy({ Username: username });
                const existingUser = await this.userRepo.findOneBy({ Username: username });
                const existSeller = await this.sellerRepo.findOneBy({ Username: username });
                const codeCheck = await this.forgotRepo.findOneBy({ Username: username });
        
                if (existingModerator || existingAdmin || existingUser||existSeller || codeCheck) {
                    const codeCheck1 = await this.forgotRepo.findOneBy({
                        Code: code,
                        Username: username,
                        Status: "Not Used",
                        // ExpareTime: LessThanOrEqual(new Date())
                        });
                    if(codeCheck1){

                        if(existingAdmin){
                            const salt = await bcrypt.genSalt();
                            const hassedpassed = await bcrypt.hash(password, salt);
                            existingAdmin.Password = hassedpassed;
                            codeCheck1.Status = "Used";
                            await this.forgotRepo.update(codeCheck1.Id, codeCheck1)
                            return this.adminRepo.update(existingAdmin.Id, existingAdmin)

                        }
                        else if(existingModerator){
                            const salt = await bcrypt.genSalt();
                            const hassedpassed = await bcrypt.hash(password, salt);
                            existingModerator.Password = hassedpassed;
                            codeCheck1.Status = "Used";
                            await this.forgotRepo.update(codeCheck1.Id, codeCheck1)
                            return this.moderatorRepo.update(existingModerator.Id, existingModerator)
                        }
                        else if(existingUser){
                            const salt = await bcrypt.genSalt();
                            const hassedpassed = await bcrypt.hash(password, salt);
                            existingUser.Password = hassedpassed;
                            codeCheck1.Status = "Used";
                            await this.forgotRepo.update(codeCheck1.Id, codeCheck1)
                            return this.userRepo.update(existingUser.Id, existingUser)
                        }
                        else if(existSeller){
                            const salt = await bcrypt.genSalt();
                            const hassedpassed = await bcrypt.hash(password, salt);
                            existSeller.Password = hassedpassed;
                            codeCheck1.Status = "Used";
                            await this.forgotRepo.update(codeCheck1.Id, codeCheck1)
                            return this.sellerRepo.update(existSeller.Id, existSeller)
                        }
                        else{
                            return "Something went wrong!";
                        }
                    }
                    else{
                        return "Incorrect, Expare or Used code";
                    }


                } else {
                    return "Given username don't exist";
                }
            }
            else{
                return "Enter you code you recived in email address";
            }
        }
        else{
            return "Please provide valid password with at least 8 characters";
        }
    }


}