import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/commons/base.entity";
import { UserEntity } from "../user/user.entity";

export enum TEAM_STATUS {
    ACIVE = 1,
    INACTIVE = 2,
    SUSPENDED = 3
}

@Entity({ schema: "public", name: "team" })
export class TeamEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "code", type: "varchar", length: 255, unique: true })
    code: string;

    @Column({ name: "name", type: "varchar", length: 255 })
    name: string;

    @Column({ name: "status", type: "enum", enum: TEAM_STATUS, default: TEAM_STATUS.ACIVE })
    status: string;

    @Column({ name: "created_by", type: "integer" })
    created_by: number;

    @Column({ name: "updated_at", type: "integer" })
    updated_by: number;

    @ManyToOne((type) => UserEntity, (user) => user.teams)
    @JoinColumn({ name: "created_by", referencedColumnName: "id" })
    pic: UserEntity;
}
