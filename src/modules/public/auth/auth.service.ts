import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async login(data) {
        const user = await this.userRepository.findOne({ where: { username: data.username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = bcrypt.compareSync(data.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Username and password does not match');
        }

        return { token: this.jwtService.sign({ ...user }), data: user };
    }

    me(id) {
        return this.userRepository.findOne(id);
    }
}
