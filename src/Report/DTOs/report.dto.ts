import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";

export class ReportDTO{

    @IsOptional()
    ReporterUsername:string;

    @IsNotEmpty({message:"Which username you want to report"})
    ReportedUsername:string;

    @IsNotEmpty({message:"Please provide discription"})
    Discription:string;

    @IsOptional()
    ModeratorUsername?:string;

    @IsOptional()
    @IsDateString()
    Timestamp:Date;

}