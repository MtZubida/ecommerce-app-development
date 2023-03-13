import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "../admin/adminentity.entity";
import { SellerForm } from "./seller.dto";

import { SellerEntity } from "./seller.entity";


@Injectable()
export class SellerService {
    constructor(
       
        @InjectRepository(SellerEntity)
        private sellerRepo: Repository<SellerEntity>,
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,

      ) {}

      getseller(id):any{
        return this.sellerRepo.findOneBy({id});
    }
     getsel():any{
        return this.sellerRepo.find();
    }
     /* insertseller(mydto:SellerForm):any {
        
   return this.sellerRepo.save(mydto)
     
    }*/

   async insertseller(mydto:SellerForm):Promise<any>  {
        const exAdmin = await this.adminRepo.findOneBy({ name: mydto.adminname });
        if(exAdmin){
            const reportEnty = new SellerEntity();
            reportEnty.admin = exAdmin;
            reportEnty.sname = mydto.sname;
            reportEnty.email = mydto.email;
            reportEnty.phn = mydto.phn;
            reportEnty.gender = mydto.gender;
            reportEnty.religion = mydto.religion;
            reportEnty.address=mydto.address,
            reportEnty.adminname=mydto.adminname
            return this.sellerRepo.save(reportEnty);
    }
    else{
        return "Only admin can create coupon. Login as admin";
    }

}


    getAdminBysellerID(id):any {
        return this.sellerRepo.find({ 
                where: {id:id},
            relations: {
                admin: true,
            },
         });
    }







    updateseller(id,sname,email,phn,gender,religion,address):any {
        return this.sellerRepo.update(id,{sname:sname,email:email,phn:phn,gender:gender,religion:religion,address:address});

        
        //return "seller id: "  + id+" and selller name is " + sname+"email is"+email+"phone number is"+phn+"address is"+address;
    
    }

    updatesellerbyid(mydto:SellerForm,id):any {
        return this.sellerRepo.update(id,mydto);
           }
    deletesellerbyid(id):any {
    
        //return "Delete id is "+id;
    
        return this.sellerRepo.delete(id);
    }
    
    
    
    
    
    
    /*constructor(
        @InjectRepository(SellerEntity)
        private managerRepo: Repository<SellerEntity>,
      ) {}*/


/*insertManager(mydto:SellerForm):any {
    
   return this.managerRepo.save(mydto);
      }
getAdminByManagerID(id):any {
        return this.managerRepo.find({ 
                where: {id:id},
            relations: {
                admin: true,
            },
         });
    }*/


}