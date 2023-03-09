import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModeratorDTO } from "./DTOs/moderator.dto";
import { SecureModeratorDTO } from "../Moderator/DTOs/moderator.secure.dto"
import { ModeratorEntity } from "./moderator.entity";
import { EditModeratorDTO } from "./DTOs/editModerator.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class ModeratorService {

    constructor(
        @InjectRepository(ModeratorEntity)
        private moderatorRepo: Repository<ModeratorEntity>
    ){}


    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.moderatorRepo.save(mydto);
    }


    // getIndex(): any{
    //     return "This path will be the Moderator panel";
    // }

    // async getAllSecureData(): Promise<SecureModeratorDTO[]> {
    //     const moderators: ModeratorEntity[] = await this.moderatorRepo.find();
    //     const secureModerators: SecureModeratorDTO[] = moderators.map(
    //         ({ Username, Firstname, Lastname, DOB, Phone, Email, filename }) => ({
    //           Username,
    //           Firstname,
    //           Lastname,
    //           DOB,
    //           Phone,
    //           Email,
    //           filename,
    //         }),
    //       );
    //     return secureModerators;
    // }

    // getAll(): any{
    //     return this.moderatorRepo.find();
    // }

    // searchById(id):any{
    //     var ext = this.moderatorRepo.findOneBy({ Id:id });
    //     if(ext){
    //         return ext;
    //     }
    //     else
    //         return "No matches found for this ID in database!"; // Need to implement
    // }

    // readTurmsAndConditions(read):any{
    //     if(read == true){
    //         return "Read turms and conditions! Can allow register procedure!";
    //     }
    //     else
    //         return "Please read turms and conditions to continue!";
    // }

    // searchByUsername(username): any{
    //     const ext = this.moderatorRepo.findOne({where: { Username:username}});
    //     if(ext){
    //         return ext;
    //     }
    //     else
    //         return "No matches found for this username in database!";

    // }

    // async login(username, password): Promise<string>{
    //     const moderator = await this.moderatorRepo.findOne({ where: { Username: username, Password: password } });
    //     if (!moderator) {
    //         return "Unsuccessfull login attempt";
    //     }
    //       return 'Login successful';
    // }


    // async register(moderatorDTO: ModeratorDTO): Promise<any> {
    //     const moderatorObject = new ModeratorEntity();
    //     moderatorObject.Firstname = moderatorDTO.Firstname;
    //     moderatorObject.Lastname = moderatorDTO.Lastname;
    //     moderatorObject.Email = moderatorDTO.Email;
    //     moderatorObject.DOB = moderatorDTO.DOB;
    //     moderatorObject.Phone = moderatorDTO.Phone;
    //     moderatorObject.Username = moderatorDTO.Username;
    //     moderatorObject.Password = moderatorDTO.Password;
    //     moderatorObject.Blocked = false;
    
    //     const existingModerator = await this.moderatorRepo.findOneBy({ Username: moderatorObject.Username });
    
    //     if (existingModerator) {
    //         return "Username already exists, please choose a different username";
    //     } else {
    //         return this.moderatorRepo.save(moderatorObject);
    //     }
    // }

    // editModerator(editModerator: EditModeratorDTO, id): any{
    //     return this.moderatorRepo.update(id, editModerator);
    // }

    // deleteModeratorById(id): any{
    //     return this.moderatorRepo.delete(id);
    // }


    // async blockModeratorById(id): Promise<any>{

    //     var ext = this.moderatorRepo.findOneBy({ Id:id });
    //     if(ext){
    //         (await ext).Blocked = true;
    //         return this.moderatorRepo.update(id, await ext);
    //     }
    //     else
    //         return "No matches found for this ID in database!"; 
    // }

    // getReportByModerator(id): any{
    //     return this.moderatorRepo.find({
    //         where: {Id:id},
    //         relations:{
    //             processedReport:true
    //         },
    //     });
    // }

    



    


}


