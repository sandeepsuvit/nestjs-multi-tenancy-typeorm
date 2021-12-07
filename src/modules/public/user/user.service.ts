import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async initialize() {
        const hasCreated = await this.userRepository.findOne({ where: { username: "superadmin" } });
        if (hasCreated) {
            throw new Error("Superadmin already created");
        }
        const password = bcrypt.hashSync('password', 10);
        const data = { username: 'superadmin', password: password, email: 'superadmin@gmail.com', role: '1' }
        await this.userRepository.save(data);

        return {
            message: "Superadmin created",
            data: { ...data, password: "password" }
        }
    }

    findAll() {
        return this.userRepository.find();
    }

    findById(id) {
        return this.userRepository.findOne(id);
    }

    create(data: any) {
        return this.userRepository.save(data);
    }

    update(id, data: any) {
        return this.userRepository.update(id, data);
    }

    delete(id) {
        return this.userRepository.softDelete(id);
    }
}
