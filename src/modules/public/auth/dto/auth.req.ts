import { IsString } from "class-validator";

export class AuthReq {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
