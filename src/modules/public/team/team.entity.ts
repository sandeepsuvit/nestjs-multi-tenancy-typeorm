import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/commons/base.entity";

export enum TEAM_STATUS {
    ACIVE = 1,
    INACTIVE = 2,
    SUSPENDED = 3
}

@Entity({ schema: "public", name: "team" })
export class TeamEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "code", type: "varchar", length: 255, unique: true})
    code: string;

    @Column({ name: "name", type: "varchar", length: 255 })
    name: string;

    @Column({ name: "status", type: "enum", enum: TEAM_STATUS, default: TEAM_STATUS.ACIVE })
    status: string;
}
