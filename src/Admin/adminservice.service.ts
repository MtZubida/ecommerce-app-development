import { Injectable } from '@nestjs/common';
import {  AdminForm } from "./adminlogin.dto";
//import { Categoryinfo } from "./categoryinfo.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class AdminService {
   
   
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService

      ) {}

      /*insertUser(mydto:AdminForm):any {
        const adminaccount = new AdminEntity()
        adminaccount.name = mydto.name;
        adminaccount.email = mydto.email;
        adminaccount.password = mydto.password;
        adminaccount.address = mydto.address;
       return this.adminRepo.save(adminaccount);
          }*/

          async signup(mydto) {
            const existingAdmin = await this.adminRepo.findOneBy({ name: mydto.name });
            if(existingAdmin){
                return "Username already exists, please choose a different username";
            }
            else{
           const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(mydto.password, salt);
            mydto.password= hassedpassed;
            return this.adminRepo.save(mydto);}
            }


            async signin(email, password){
            //console.log(mydto.email);
            const mydata= await this.adminRepo.findOneBy({email: email});
            if(mydata){
                const isMatch=await bcrypt.compare(password, mydata.password);
            if(isMatch) {
            return 1;
            }
            else {
                return 0;
            }
            }
            else
            return 0;
            
            }

            async sendEmail(mydata){
                return   await this.mailerService.sendMail({
                       to: mydata.email,
                       subject: mydata.subject,
                       text: mydata.text, 
                     });
               
               } 
                 
    
     getUserByIDName(id):any {
          var ext=this.adminRepo.findOneBy({ id:id });
            if(ext){
                return ext;
            }
            else
                return 'No matches found ';
        }

        getUser():any {
            return this.adminRepo.find();
        }
     
        updateUserbyid(mydto:AdminForm,id):any {
            return this.adminRepo.update(id,mydto);
               }

   deleteUserbyid(id):any {
    
        return this.adminRepo.delete(id);
    }
    

    getsellersByAdminID(id):any {
        return this.adminRepo.find({ 
                where: {id:id},
            relations: {
                sellers: true,
            },
         });
        }





    
    
    
    }


