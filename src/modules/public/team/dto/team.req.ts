import { IsString, IsOptional, IsEnum } from "class-validator";
import { TEAM_STATUS } from "../team.entity";

export class TeamReq {
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(TEAM_STATUS)
    status: string;
}