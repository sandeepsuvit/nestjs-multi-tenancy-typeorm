import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "src/commons/base.entity";
import { TeamEntity } from "../team/team.entity";

export enum USER_STATUS {
    ACIVE = 1,
    INACTIVE = 2,
    SUSPENDED = 3
}

export enum USER_ROLE {
    SUPERADMIN = 1,
    ADMIN = 2,
    AE = 3
}

@Entity({ schema: "public", name: "user" })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar", length: 255, unique: true })
    username: string;

    @Column({ name: "email", type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ name: "password", type: "varchar", length: 255 })
    password: string;

    @Column({ name: "status", type: "enum", enum: USER_STATUS, default: USER_STATUS.ACIVE })
    status: string;

    @Column({ name: "status", type: "enum", enum: USER_ROLE, default: USER_ROLE.SUPERADMIN })
    role: string;

    @OneToMany((type) => TeamEntity, (team) => team.pic)
    teams: TeamEntity[];
}
