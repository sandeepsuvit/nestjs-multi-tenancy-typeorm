import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { USER_STATUS, USER_ROLE } from '../user.entity';

export class UserReq {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsOptional()
    @IsEnum(USER_STATUS)
    status: string;

    @IsEnum(USER_ROLE)
    role: string;
}

export class UserReqUpdate extends UserReq {
    @IsEnum(USER_ROLE)
    @IsOptional()
    role: string;
}