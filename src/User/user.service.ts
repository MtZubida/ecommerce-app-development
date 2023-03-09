import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/Admin/admin.entity";
import { ModeratorEntity } from "src/Moderator/moderator.entity";
import { Repository } from "typeorm";
import {UserEntity } from "./user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        @InjectRepository(ModeratorEntity)
        private moderatorRepo: Repository<ModeratorEntity>, 

        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
    ){}

    getIndex(): any{
        return "This path will be the User panel";
    }







    async signup(mydto) {

        const existingAdmin = await this.adminRepo.findOneBy({ Username: mydto.Username });
        const existingModerator = await this.moderatorRepo.findOneBy({ Username: mydto.Username });
        const existingUser = await this.userRepo.findOneBy({ Username: mydto.Username });

        if (existingModerator || existingAdmin || existingUser) {
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